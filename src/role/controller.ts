import { Request,Response} from "express";
import pool from "../db";
import {getRolesQuery} from "./query"

export const getRoles=async(req:Request,res:Response)=>{
    try{
        const {rows}=await pool.query(getRolesQuery);
        return{
            error:false,
            code:200,
            message:"Roles retrieved sucessfully",
            data:rows
        }

    }
    catch(error) {
        console.error('Error updating user data:', error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
        }
    }
}