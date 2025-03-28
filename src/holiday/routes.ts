import { RequestHandler, Router } from "express";
import { getHolidays } from "./controller";

const getHolidaysHandler:RequestHandler=async(req,res,next)=>{
    try {
        const data=await getHolidays(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
 
    } catch (error) {
        next(error);
    }
}

const holidayRoute = Router();
holidayRoute.get('/getHolidays',getHolidaysHandler);

export default holidayRoute;