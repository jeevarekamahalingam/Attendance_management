import { RequestHandler, Router } from "express";
import { claimExpense,getExpenseStat } from "./controller";

const claimExpenseHandler:RequestHandler=async(req,res,next)=>{
    try {
        const result = await claimExpense(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}

const getExpenseStatHandler:RequestHandler=async(req,res,next)=>{
    try {
        const result = await getExpenseStat(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}

const expenseRoute=Router();

expenseRoute.post('/claimExpense',claimExpenseHandler)
expenseRoute.get('/getExpenseStat/:user_uuid',getExpenseStatHandler)

export default expenseRoute;