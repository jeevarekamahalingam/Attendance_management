import { Request,Response} from "express";
import pool from "../db";
import {getRolesQuery} from "./query"
import { APIresponse } from "../type";

export const getRoles=async():Promise<APIresponse>=>{
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