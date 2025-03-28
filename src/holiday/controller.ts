import pool from '../db';
import { getHolidaysQuery } from './query'; 
import { APIresponse } from '../type';

export const getHolidays=async():Promise<APIresponse>=>{
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