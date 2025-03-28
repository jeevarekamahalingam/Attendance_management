import { RequestHandler, Router } from "express";
import {getAttendenceCount,getCheckinCheckout,newCheckin,checkOut,getTotalAttendenceDetail} from './controller'
const countAttendenceHandler:RequestHandler =async (req,res, next) => {
    try {
        const result=await getAttendenceCount(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const checkinCheckoutHandler:RequestHandler =async (req,res, next) => {
    try {
        const result=await getCheckinCheckout(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const newCheckinHandler:RequestHandler =async (req,res, next) => {
    try {
        const result=await newCheckin(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const checkoutHandler:RequestHandler=async(req,res,next)=>{
    try {
        const result=await checkOut(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}

const getTotalAttendenceDetailHandler:RequestHandler=async(req,res,next)=>{
    try {
       const result= await getTotalAttendenceDetail(req,res);
       const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}
const attendenceRoute = Router();
attendenceRoute.get('/countAttendence/:user_uuid',countAttendenceHandler);
attendenceRoute.post('/getcheckincheckout',checkinCheckoutHandler);
attendenceRoute.post('/newCheckin',newCheckinHandler);
attendenceRoute.put('/checkout',checkoutHandler);
attendenceRoute.get('/getTotalAttendenceDetail/:user_uuid',getTotalAttendenceDetailHandler);



 export default attendenceRoute;