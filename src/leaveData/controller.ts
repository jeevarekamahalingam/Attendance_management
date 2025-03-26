import { Request,Response} from "express";
import pool from "../db";
import { leave } from "./types";
import {createLeaveQuery,
    getAllLeaveForAUserquery,
    changeLeaveStatusQuery,
    leaveDurationCalculationQuery,
    listTeamMembersQuery,
    getALeaveInfoOfAUserquery} from './query';
import {getReportingManagerByUserUUID,updateLeaveDurationQuery,halfLeaveQuery} from '../users/queries'

export const applyLeave = async (req: Request, res: Response) => {
    try {
      const {
        user_uuid,
        title,
        leave_type,
        start_date,
        end_date,
        reason
      }: leave= req.body;

      if (!user_uuid || !title || !leave_type || !start_date || !end_date || !reason ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      let reportingManagerUuid=await pool.query(getReportingManagerByUserUUID,[user_uuid]);

      reportingManagerUuid=reportingManagerUuid.rows[0].reporting_manager_uuid;
      const applied_on=new Date();
      const values = [
        user_uuid,
        title,
        leave_type,
        start_date,
        end_date,
        reason,
        reportingManagerUuid,
        applied_on
      ];
      
      const { rows } = await pool.query(createLeaveQuery, values);
  
      return res.status(201).json({ message: "Leave Applied sucessfully", user: rows[0] });
    } catch (error) {
      console.error("Error in Leave applying:", error);
      return res.status(500).json({ error:"Internal Server Error" });
    }
  };

export const getAllLeaveForAUser=async(req: Request, res: Response)=>{
    try{
        const {user_uuid,status,isGreater}:leave=req.body;
        if (!user_uuid) {
            return res.status(400).json({ error: "Missing required fields" });
          }
        const statusValue = status ?? null;
        const query=getAllLeaveForAUserquery(isGreater);
          const { rows } = await pool.query(query, [user_uuid,statusValue]);
          if (rows.length === 0) {
            return res.status(404).json({ message: 'No data found for this UUID ' });
          }
          
          
          return res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error fetching checkin/checkout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const changeLeaveStatus=async(req:Request,res:Response)=>{
    try{
            const {
            id,
            user_uuid,
            status
        }:leave=req.body;
        if (!user_uuid || !id || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result=await pool.query(changeLeaveStatusQuery,[status,id]);
        if (status==='approved'){
            const leaveType=result.rows[0].leave_type;
            if(leaveType=='SL - 0.5'||leaveType=='AL - 0.5'|| leaveType.trim()=='CL - 0.5'){
                await pool.query(halfLeaveQuery,[user_uuid]);
            }
            else{
                let LeaveDuration=await pool.query(leaveDurationCalculationQuery,[id]);
                LeaveDuration=LeaveDuration.rows[0].datedifference;         
                await pool.query(updateLeaveDurationQuery,[user_uuid,LeaveDuration])
            }
            
        }
        
        return res.status(201).json({ message: "Status of Leave changed" });

     
      

    }catch(error) {
        console.error('Error fetching checkin/checkout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const listTeamMeamberRequest=async(req:Request,res:Response)=>{
    try{
        const{reporting_manager_uuid}=req.params;
        if(!reporting_manager_uuid){
            return res.status(400).json({error:"Insufficient data"})
        }
        const {rows}=await pool.query(listTeamMembersQuery,[reporting_manager_uuid]);
        return res.status(200).json({data: rows });

    }
    catch(error) {
        console.error('Error fetching checkin/checkout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getALeaveInfoOfAUserByLeaveID=async(req:Request,res:Response)=>{
    try{
        const {leave_id}=req.params;
        if(!leave_id){
            return res.status(400).json({error:"Insufficient data"})
        }
        const {rows}=await pool.query(getALeaveInfoOfAUserquery,[leave_id]);
        return res.status(200).json({data: rows });
    }
    catch(error) {
        console.error('Error fetching checkin/checkout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
