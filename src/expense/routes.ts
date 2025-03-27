import { RequestHandler, Router } from "express";
import { claimExpense,getExpenseStat } from "./controller";

const claimExpenseHandler:RequestHandler=async(req,res,next)=>{
    try {
        const data = await claimExpense(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

const getExpenseStatHandler:RequestHandler=async(req,res,next)=>{
    try {
        const data = await getExpenseStat(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

const expenseRoute=Router();

expenseRoute.post('/claimExpense',claimExpenseHandler)
expenseRoute.get('/getExpenseStat/:user_uuid',getExpenseStatHandler)

export default expenseRoute;