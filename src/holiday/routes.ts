import { RequestHandler, Router } from "express";
import { getHolidays } from "./controller";

const getHolidaysHandler:RequestHandler=async(req,res,next)=>{
    try {
        const result=await getHolidays();
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}

const holidayRoute = Router();
holidayRoute.get('/getHolidays',getHolidaysHandler);

export default holidayRoute;