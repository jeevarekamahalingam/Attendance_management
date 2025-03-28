import { Request,Response} from "express";
import pool from "../db";
import {isUUIDpresentQuery ,
  getRoleNameQuery,
  getUserData,
  getReportingManager,
  getUsersByManagerQuery,
  createUserQuery,
  getLeaveStatForAUserquery,
  getListOfReportingManagersQuery,
  updateUsersQuery } from "./queries";
import { User,userEditData } from "./types";
import { APIresponse } from "../type";

export const isUUIDpresent=async(req:Request,res:Response):Promise<APIresponse>=>{
  try {
    const { uuid } = req.params;

    if (!uuid) {
        return {
          error:true,
          code:400,
          message:"uuid is required",
        }
    }

    const { rows } = await pool.query(isUUIDpresentQuery, [uuid]);

    if (rows.length === 0) {
        return {
          error:true,
          code:404,
          message:"User not found"
        }
    }

    return{
      error:false,
      code:200,
      message:"User exists"
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


export const getUserDetail=async(req:Request,res:Response):Promise<APIresponse>=>{
  try{
    const {uuid}=req.params;

    if (!uuid) {
      return{
        error:true,
        code:400,
        message:"UUID is required"
      }
    }

    const {rows}=await pool.query(getUserData,[uuid]);

    if (rows.length === 0) {
      return {
        error:true,
        code:404,
        message:"User not found"
      }
  }

    //to get role name based on id and replacing in role_id
    const roleRes = await pool.query(getRoleNameQuery, [rows[0]["role_id"]]);
    rows[0]["role_id"]=roleRes.rows[0].role_name;

    //to get reporting_manager_name
    const reportingManager = await pool.query(getReportingManager, [rows[0]["reporting_manager_uuid"]]);
    rows[0]["reporting_manager_uuid"]=reportingManager?.rows[0]?.names?? null;

    return{
      error:false,
      code:200,
      message:"Retrived user data",
      data:rows[0]      
    }
  }
  catch (error) {
    console.error("Error in retriving user data", error);
    return{
      error:true,
      code:500,
      message: `Internal Server Error${error}`
    }
  }
}


export const getTeamMembers = async (req: Request):Promise<APIresponse> => {
  try{
    const { uuid } = req.params;

    if (!uuid) {
        return{
          error:true,
          code:400,
          message:"uuid required"
        }
    }

    const query = getUsersByManagerQuery();
    const { rows } = await pool.query(query, [uuid]);

    if (rows.length === 0) {
        return { 
          error:true,
          code:404,
          message: "No users found under this manager" };
    }

    return {
      error:false,
      code:200,
      message:"Retrived Team Members",
      data:rows
    }
  }
  catch(error){
    console.error("Error in retriving team members data", error);
    return{
      error:true,
      code:500,
      message: `Internal Server Error${error}`
    }
  }
    
};


export const createUser = async (req: Request, res: Response):Promise<APIresponse> => {
    try {
      const {
        uuid_,
        employee_code,
        first_name,
        last_name,
        user_name,
        role_id,
        address,
        phone_no,
        department,
        reporting_manager_uuid
      }: User = req.body;

      if (!uuid_ ||!employee_code || !first_name || !last_name || !user_name || !role_id || !department|| !address || !phone_no ) {
        return{
          error:true,
          code:400,
          message:"Missing required fields"
        }
      }
      
      
      const values = [
        uuid_,
        employee_code,
        first_name,
        last_name,
        user_name,
        role_id,
        address,
        phone_no,
        department,
        reporting_manager_uuid ?? null
      ];
  
      const { rows } = await pool.query(createUserQuery, values);
  
      return{
        error:false,
        code:201,
        message:"User Created sucessfully",
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        error:true,
        code:500,
        message: `Internal Server Error${error}`
      }
    }
  };


export const updateUserByUser=async(req:Request,res:Response):Promise<APIresponse>=>{
    try{
        const {
            uuid_,
            ...attributes
        }: userEditData = req.body;
        if(!uuid_ && !attributes){
          return {
            error:true,
            code:400,
            message:"Missing required details"
          }
        }
        const query=updateUsersQuery(attributes,uuid_);
        const {rows}=await pool.query(query);

        if(rows.length===0){
          return{
            error:true,
            code:404,
            message:"user not found"
          }
        }

        return{
          error:false,
          code:201,
          message:"User Updated sucessfully"
        }
        
    } catch(error) {
      console.error('Error updating user data:', error);
      return {
        error:true,
        code:500,
         message: `Internal Server Error${error}`
      }
  }
  
}




export const updateUserByHR=async(req:Request,res:Response):Promise<APIresponse>=>{
  try{
      const {
          uuid_,
          ...attributes
      }: User = req.body;
      if(!uuid_ && !attributes){
        return {
          error:true,
          code:400,
          message:"Missing required details"
        }
      }
      const query=updateUsersQuery(attributes,uuid_);
      const {rows}=await pool.query(query);

      if(rows.length===0){
        return{
          error:true,
          code:404,
          message:"user not found"
        }
      }

      return{
        error:false,
        code:201,
        message:"User Updated sucessfully"
      }
      
  } catch(error) {
    console.error('Error updating user data:', error);
    return {
      error:true,
      code:500,
       message: `Internal Server Error${error}`
    }
}

}


export const getLeaveStatForAUser=async(req:Request,res:Response):Promise<APIresponse>=>{
  try{
      const {uuid_}=req.params;
      if(!uuid_){
          return {
            error:true,
            code:400,
            message:"user uuid required"
          }
      }
      const {rows}=await pool.query(getLeaveStatForAUserquery,[uuid_]);


      return {
        error:false,
        code:200,
        message:"Leaves stats retrived for user",
        data:rows}
  }
  catch(error) {
      console.error('Error fetching leave stat', error);
      return {
        error:true,
        code:500,
         message: `Internal Server Error${error}`
      }
  }
}

export const getListOfReportingManagers=async():Promise<APIresponse>=>{
  try{
    const{rows}=await pool.query(getListOfReportingManagersQuery);
    return {
      error:false,
      code:200,
      message:"List of reporting managers retrived",
      data:rows
    }
  }
  catch(error){
    console.error(`Internal Server Error${error}`);
    return {
      error:true,
      code:500,
       message: `Internal Server Error${error}`
    }
  }
}