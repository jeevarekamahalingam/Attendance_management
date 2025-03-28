import { Request,Response} from "express";
import pool from "../db";
import { leave,leaveTypeEnum,leaveStatusEnum } from "./types";
import {createLeaveQuery,
    getAllLeaveForAUserquery,
    changeLeaveStatusQuery,
    leaveDurationCalculationQuery,
    listTeamMembersQuery,
    getALeaveInfoOfAUserquery} from './query';
import {getReportingManagerByUserUUID,updateLeaveDurationQuery,halfLeaveQuery} from '../users/queries'
import { APIresponse } from "../type";

export const applyLeave = async (req: Request, res: Response):Promise<APIresponse> => {
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
        return{
            error:true,
            code:400,
            message:"Missing required fields"
        }
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
  
      return{
        error:false,
        code:201,
        message:"Leave Applied sucessfully"
      }
    }  
    catch(error){
        console.error("Error in apllying leave", error);
        return{
          error:true,
          code:500,
          message: `Internal Server Error${error}`
        }
      }
  };

export const getAllLeaveForAUser=async(req: Request, res: Response):Promise<APIresponse>=>{
    try{
        const {user_uuid,status,isGreater}:leave=req.body;
        if (!user_uuid) {
            return{
                error:true,
                code:400,
                message:"Missing required fields"
            }
          }
        
        const statusValue = status ?? null;
        const query=getAllLeaveForAUserquery(isGreater);

        const { rows } = await pool.query(query, [user_uuid,statusValue]);          
          
        return {
            error:false,
            code:200,
            message:rows.length!==0?"Retrived Leave data for this user":"No leave data found for this user",
            data:rows
        }
    }
    catch(error){
        console.error("Error in retriving leave for this user", error);
        return{
          error:true,
          code:500,
          message: `Internal Server Error${error}`
        }
      }
}

export const changeLeaveStatus=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
            const {
            id,
            status
        }:leave=req.body;
        if (!id || !status) {
            return{
                error:true,
                code:400,
                message:"Missing required fields"
            }
        }

        const {rows}=await pool.query(changeLeaveStatusQuery,[status,id]);
        const{user_uuid}=rows[0]
        if (status===leaveStatusEnum.APPROVED){
            const {leaveType}=rows[0]
            if(leaveType==leaveTypeEnum.SL_HALF ||leaveType==leaveTypeEnum.AL_HALF || leaveType==leaveStatusEnum.REJECTED){
                await pool.query(halfLeaveQuery,[user_uuid]);
            }
            else{
                const {rows}=await pool.query(leaveDurationCalculationQuery,[id]);
                const{datedifference}=rows[0];
                await pool.query(updateLeaveDurationQuery,[user_uuid,datedifference])
            }
            
        }
        

        return{
            error:false,
            code:201,
            message:"Status of leave changed"
        }
      

    }
    catch(error){
        console.error("Error in chamnging Leave Status", error);
        return{
          error:true,
          code:500,
          message: `Internal Server Error${error}`
        }
      }
}

export const listTeamMeamberRequest=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
        const{reporting_manager_uuid}=req.params;
        if(!reporting_manager_uuid){
            return {
                error:true,
                code:400,
                message:"Missing required fields"
            }
        }

        const {rows}=await pool.query(listTeamMembersQuery,[reporting_manager_uuid]);
        return{
            error:false,
            code:200,
            message:rows.length!==0?"Retrived list of team member requests":"No leave request Found",
            data:rows
        }

    }
    catch(error){
        console.error("Error in getting list of team members request", error);
        return{
          error:true,
          code:500,
          message: `Internal Server Error${error}`
        }
      }
}

export const getALeaveInfoOfAUserByLeaveID=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
        const {leave_id}=req.params;
        if(!leave_id){
            return {
                error:true,
                code:400,
                message:"Missing required fields"
            }
        }
        const {rows}=await pool.query(getALeaveInfoOfAUserquery,[leave_id]);
        return{
            error:false,
            code:200,
            message:"Retrived Leave Info for requested user",
            data:rows
        }
    }
    catch(error){
        console.error("Error in  retriving leave details of a user", error);
        return{
          error:true,
          code:500,
          message: `Internal Server Error${error}`
        }
      }
}
