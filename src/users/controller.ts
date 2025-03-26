import { Request,Response} from "express";
import pool from "../db";
import {isUUIDpresentQuery ,
  getRoleNameQuery,
  getUserData,
  getReportingManager,
  getRoleID,
  getUsersByManagerQuery,
  createUserQuery,
  getLeaveStatForAUserquery } from "./queries";
import { User } from "./types";

export const isUUIDpresent=async(req:Request,res:Response)=>{
  try {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(400).json({ error: "UUID is required" });
    }
    const query = isUUIDpresentQuery;
    const { rows } = await pool.query(query, [uuid]);
    if (rows.length === 0) {
        return res.status(404).json({ error: "User does not exist" });
    }
    return res.status(200).json({ message: "User exists" });
  } catch (error) {
      console.error("Error checking UUID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getUserDetail=async(req:Request,res:Response)=>{
  try{
    const {uuid}=req.params;
    if (!uuid) {
      return res.status(400).json({ error: "UUID is required" });
    }
    const query=getUserData;
    const {rows}=await pool.query(query,[uuid]);
    const roleRes = await pool.query(getRoleNameQuery, [rows[0]["role_id"]]);
    rows[0]["role_id"]=roleRes.rows[0].role_name;
    const reportingManager = await pool.query(getReportingManager, [rows[0]["reporting_manager_uuid"]]);
    rows[0]["reporting_manager_uuid"]=reportingManager.rows[0].names;
    return res.status(200).json({ data: JSON.parse(JSON.stringify(rows[0])) });
  }
  catch (error) {
    console.error("Error checking UUID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
}
}
export const getTeamMembers = async (req: Request) => {
    const { user_name } = req.params;

    if (!user_name) {
        throw new Error("Manager email is required");
    }

    const query = getUsersByManagerQuery();
    const { rows } = await pool.query(query, [user_name]);

    if (rows.length === 0) {
        return { message: "No users found under this manager" };
    }

    return rows;
};


export const createUser = async (req: Request, res: Response) => {
    try {
      const {
        employee_code,
        first_name,
        last_name,
        user_name,
        role_id,
        address,
        phone_no,
        department,
        reporting_manager_uuid
      }: User & { role_id: string } = req.body;
      console.log(req.body);

      if (!employee_code || !first_name || !last_name || !user_name || !role_id || !department) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const roleRes = await pool.query(getRoleID, [role_id]);

      if (roleRes.rows.length === 0) {
        return res.status(400).json({ error: `Role '${role_id}' does not exist.` });
      }
  
      const role_numeric_id = roleRes.rows[0].id;
  
      const values = [
        employee_code,
        first_name,
        last_name,
        user_name,
        role_numeric_id,
        address,
        phone_no,
        department,
        reporting_manager_uuid ?? null
      ];
  
      const { rows } = await pool.query(createUserQuery, values);
  
      return res.status(201).json({ message: "User created successfully", user: rows[0] });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


export const updateUserByUser=async(req:Request,res:Response)=>{
    try{
        const {
            address,
            phone_no
        }: User = req.body;
        console.log(req.body);
        // const values = [

        //     password ?? null,
        //     address ?? null,
        //     phone_no ?? null,
        
        // ];
        // const { rows } = await pool.query(createUserQuery, values);
    
        // return res.status(201).json({ message: "User created successfully", user: rows[0] });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  
}
export const getLeaveStatForAUser=async(req:Request,res:Response)=>{
  try{
      const {uuid_}=req.params;
      if(!uuid_){
          return res.status(400).json({error:"Insufficient data"})
      }
      const {rows}=await pool.query(getLeaveStatForAUserquery,[uuid_]);
      return res.status(200).json({data: rows });
  }
  catch(error) {
      console.error('Error fetching checkin/checkout:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}