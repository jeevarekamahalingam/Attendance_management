import { RequestHandler, Router } from "express";
import { getHolidays } from "./controller";

const getHolidaysHandler:RequestHandler=async(req,res,next)=>{
    try {
        await getHolidays(req,res);
    } catch (error) {
        next(error);
    }
}

const holidayRoute = Router();
holidayRoute.get('/getHolidays',getHolidaysHandler);

export default holidayRoute;