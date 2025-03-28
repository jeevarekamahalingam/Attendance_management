import pool from '../db';
import {Request, Response} from 'express';
import { getHolidaysQuery } from './query'; 

export const getHolidays=async(req:Request,res:Response)=>{
    try{
        const{rows}=await pool.query(getHolidaysQuery);
        return{
            error:false,
            code:200,
            message:"Retrived HOlidays sucessfully",
            data:rows
        }
    }
    catch(error){
        console.error("Error in getting list of holidays", error);
        return{
          error:true,
          code:500,
          message: `Internal Server Error${error}`
        }
      }
}