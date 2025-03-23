import { Request,Response} from "express";
import pool from "../db";
import {isUUIDpresentQuery ,getUserData,getUsersByManagerQuery,createUserQuery } from "./queries";
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
    return res.status(200).json({ data: rows });
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
        password,
        address,
        phone_no,
        department,
        reporting_manager_id
      }: User & { role_id: string } = req.body;
      console.log(req.body);

      if (!employee_code || !first_name || !last_name || !user_name || !role_id || !password || !department) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const roleRes = await pool.query(`SELECT id FROM role WHERE role_name = $1`, [role_id]);

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
        password,
        address,
        phone_no,
        department,
        reporting_manager_id ?? null
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
            password,
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