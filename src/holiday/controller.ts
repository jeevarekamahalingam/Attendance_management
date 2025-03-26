import pool from '../db';
import {Request, Response} from 'express';
import { getHolidaysQuery } from './query'; 

export const getHolidays=async(req:Request,res:Response)=>{
    try{
        const{rows}=await pool.query(getHolidaysQuery);
        return res.status(200).json({data:rows});
    }
    catch(error){
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}