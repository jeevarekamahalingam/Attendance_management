import pool from '../db';
import {countAttendence,checkIncheckoutDataQuery,toInsertValueToAttendenceTable,checkoutQuery,getAttendenceDetailQuery} from './query'
import {Request, Response} from 'express'
import fs from'fs';
import path from 'path';
import {checkinCheckoutDateReq} from './types' 
import {getApprovedLeaveQuery} from '../leaveData/query'

export const getAttendenceCount=async(req:Request,res:Response)=>{
    try{
        const {user_uuid}=req.params;
        const query=countAttendence;
        const {rows}=await pool.query(query,[user_uuid]);
        if (rows.length==0){
            res.status(404).json({message:'No data found'});
        }
        const monthName = new Date().toLocaleString('default', { month: 'long' });
        
        const filePath = path.join(__dirname, '../workingDays.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const workingData = JSON.parse(fileContent); 
    
        const workingDays = workingData[0][monthName];
    
        rows[0].workingDays = workingDays;
        return res.status(200).json({ data: rows });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getCheckinCheckout=async(req:Request, res:Response)=>{
    try{
    const {
        date,
        uuid
    }:checkinCheckoutDateReq=req.body;
    if(!date || !uuid){
        return res.status(400).json({ error: 'parameters are required in the body' });


    }
    const query=checkIncheckoutDataQuery;
    const {rows}=await pool.query(query,[date,uuid]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'No data found for this UUID and date' });
      }
  
      return res.status(200).json({ data: rows[0] });
    } catch (error) {
      console.error('Error fetching checkin/checkout:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export const newCheckin=async(req:Request,res:Response)=>{
    try{
     
        const {
            date,
            uuid,
        }:checkinCheckoutDateReq=req.body;
        if(!date || !uuid){
            return res.status(400).json({ error: 'parameters are required in the body' });
    
        } 
        const timestamp=new Date();
        const query=toInsertValueToAttendenceTable;
        const {rows}=await pool.query(query,[uuid,date,timestamp]);
        return res.status(201).json({ message: "Attendence recorded succesfully", user: rows[0] });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
}

export const checkOut=async(req:Request,res:Response)=>{
    try{
     
        const {
            date,
            uuid,
        }:checkinCheckoutDateReq=req.body;
        if(!date || !uuid){
            return res.status(400).json({ error: 'parameters are required in the body' });
    
        } 
        const timestamp=new Date();
        const query=checkoutQuery;
        const {rows}=await pool.query(query,[timestamp,uuid,date])
        return res.status(201).json({ message: "Attendence recorded succesfully", user: rows[0] });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
}

export const getTotalAttendenceDetail=async(req:Request,res:Response)=>{
    try{
        const {user_uuid}=req.params;
        const PresentDates=await pool.query(getAttendenceDetailQuery,[user_uuid]);
        const PreviusLeave=await pool.query(getApprovedLeaveQuery,[user_uuid]);
        const TotalAttendence=[...PresentDates.rows,...PreviusLeave.rows];
        TotalAttendence.sort((record1,record2)=>{
            return new Date(record2.date).getTime() - new Date(record1.date).getTime();
        })
        console.log(TotalAttendence);
        return res.status(200).json({data:TotalAttendence});
    }
    catch(error){
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
