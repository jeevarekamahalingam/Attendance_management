import pool from '../db';
import {countAttendence,checkIncheckoutDataQuery,toInsertValueToAttendenceTable,checkoutQuery,getAttendenceDetailQuery} from './query'
import {Request, Response} from 'express'
import fs from'fs';
import path from 'path';
import {checkinCheckoutDateReq} from './types' 
import {getApprovedLeaveQuery} from '../leaveData/query'
import { APIresponse } from '../type';

export const getAttendenceCount=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
        const {user_uuid}=req.params;
        const query=countAttendence;
        const {rows}=await pool.query(query,[user_uuid]);
        if (rows.length==0){
            // res.status(404).json({message:'No data found'});
            return{
                error:true,
                code:404,
                message:"No data found"
            }
        }
        const monthName = new Date().toLocaleString('default', { month: 'long' });
        
        const filePath = path.join(__dirname, '../workingDays.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const workingData = JSON.parse(fileContent); 
    
        const workingDays = workingData[0][monthName];
    
        rows[0].workingDays = workingDays;
        // return res.status(200).json({ data: rows });
        return {
            error:false,
            code:200,
            message:"retrived attendene data",
            data:rows
        }
    }
    catch (error) {
        console.error("Error checking UUID:", error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
          
        }
    }
}

export const getCheckinCheckout=async(req:Request, res:Response):Promise<APIresponse>=>{
    try{
    const {
        date,
        uuid
    }:checkinCheckoutDateReq=req.body;
    if(!date || !uuid){
        return{
            error:true,
            code:400,
            message:"Missing required fields"
        }

    }
    const query=checkIncheckoutDataQuery;
    const {rows}=await pool.query(query,[date,uuid]);
    // if (rows.length === 0) {
    //     return res.status(404).json({ message: 'No data found for this UUID and date' });
    //   }
  
    //   return res.status(200).json({ data: rows[0] });
      return{
        error:false,
        code:200,
        message:rows.length!==0?"Retrived checkincheckout data":"No data found",
        data:rows.length!==0?rows[0]:[]
      }
    } 
    catch (error) {
        console.error("Error checking UUID:", error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
          
        }
    }
    
}

export const newCheckin=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
     
        const {
            date,
            uuid,
        }:checkinCheckoutDateReq=req.body;
        if(!date || !uuid){
            return{
                error:true,
                code:400,
                message:"Missing required fields"
            }
        } 
        const timestamp=new Date();
        const query=toInsertValueToAttendenceTable;
        const {rows}=await pool.query(query,[uuid,date,timestamp]);
        return {
            error:false,
            code:201,
            message:"Attendence recorded succesfully"
        }
    }
    catch (error) {
        console.error("Error creating new checkin:", error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
          
        }
    }
    
}

export const checkOut=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
     
        const {
            date,
            uuid,
        }:checkinCheckoutDateReq=req.body;
        if(!date || !uuid){
            return{
                error:true,
                code:400,
                message:"Missing required fields"
            }
        } 
        const timestamp=new Date();
        const query=checkoutQuery;
        const {rows}=await pool.query(query,[timestamp,uuid,date])
        // return res.status(201).json({ message: "Attendence recorded succesfully", user: rows[0] });
        return{
            error:false,
            code:201,
            message:"Attendence recorded successfully"
        }

    } 
    catch (error) {
        console.error("Error while updating checkout:", error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
          
        }
    }
}

export const getTotalAttendenceDetail=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
        const {user_uuid}=req.params;
        const PresentDates=await pool.query(getAttendenceDetailQuery,[user_uuid]);
        const PreviusLeave=await pool.query(getApprovedLeaveQuery,[user_uuid]);
        const TotalAttendence=[...PresentDates.rows,...PreviusLeave.rows];
        TotalAttendence.sort((record1,record2)=>{
            return new Date(record1.date).getTime() - new Date(record2.date).getTime();
        })

        return{
            error:false,
            code:200,
            message:"Attendence record fetched sucessfully",
            data:TotalAttendence
        }
    }
    catch (error) {
        console.error("Error while retriving attendence record", error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
          
        }
    }
}
