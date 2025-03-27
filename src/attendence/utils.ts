import { pool } from '../db';
import { updateCheckoutQuery } from './query';
export const updateCheckout=async()=>{
    try{
        await pool.query(updateCheckoutQuery);
    }
    catch(error){
        console.error("Internal Server Error")
    }
}