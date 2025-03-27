import { Request,Response} from "express";
import pool from "../db";
import { Expense } from "./type";
import { claimExpenseQuery,getClaimRecordsQuery,getExpenseStatQuery } from "./query";

export const claimExpense=async(req:Request,res:Response)=>{
    try{
        const{
            user_uuid,
            expense_category,
            expense_date,
            expense_amount,
            description
        }:Expense=req.body;

        if(!user_uuid || !expense_category || !expense_date ||!expense_amount ||!description){
            return{
                error:true,
                code:400,
                message:"Required fields Missing"
            }
        }
        const applied_date=new Date();
        const values=[
            user_uuid,
            applied_date,
            expense_category,
            expense_date,
            expense_amount,
            description]
        const query=claimExpenseQuery();
        const{rows}=await pool.query(query,values);
        return{
            error:false,
            code:201,
            message:"Expense claim applied sucessfully"
        }
    }
    catch (error) {
        console.error("server error", error);
        return {
          error:true,
          code:500,
           message: `Internal Server Error${error}`
          
        }
    }
}

export const  getClaimRecords=async(req:Request,res:Response)=>{
    try{
        const{
            user_uuid,
            status
        }:Expense=req.body;

        if(!user_uuid || !status){
            return {
                error:true,
                code:400,
                message:"Required fields Missing"
            }
        }

        const {rows}= await pool.query(getClaimRecordsQuery(),[user_uuid,status]);
        
        return{
            error:false,
            code:200,
            message: rows.length!==0?"Retrived records retrived":"no records found",
            data:rows
        }

    }
    catch (error) {
        console.error("server error", error);
        return {
          error:true,
          code:500,
            message: `Internal Server Error${error}`
        }
    }
}
export const getExpenseStat=async(req:Request,res:Response)=>{
    try{
        const{
            user_uuid,
        }=req.params;
        
        if(!user_uuid ){
            return{
                error:true,
                code:400,
                message:"Required fields missing"
            }
        }
        const query=getExpenseStatQuery();
        const {rows}=await pool.query(query,[user_uuid]);
        return{
            error:false,
            code:200,
            message:"Retrived expense Stat",
            data:rows
        }
    }
    catch (error) {
        console.error("server error", error);
        return {
          error:true,
          code:500,
            message: `Internal Server Error${error}`
        }
    }
}

