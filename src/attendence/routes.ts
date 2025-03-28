import { RequestHandler, Router } from "express";
import {getAttendenceCount,getCheckinCheckout,newCheckin,checkOut,getTotalAttendenceDetail} from './controller'
const countAttendenceHandler:RequestHandler =async (req,res, next) => {
    try {
        const data=await getAttendenceCount(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
 
    } catch (error) {
        next(error);
    }
};
const checkinCheckoutHandler:RequestHandler =async (req,res, next) => {
    try {
        const data=await getCheckinCheckout(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
 
    } catch (error) {
        next(error);
    }
};
const newCheckinHandler:RequestHandler =async (req,res, next) => {
    try {
        const data=await newCheckin(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
 
    } catch (error) {
        next(error);
    }
};
const checkoutHandler:RequestHandler=async(req,res,next)=>{
    try {
        const data=await checkOut(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
 
    } catch (error) {
        next(error);
    }
}

const getTotalAttendenceDetailHandler:RequestHandler=async(req,res,next)=>{
    try {
       const data= await getTotalAttendenceDetail(req,res);
       const statusCode:any=data.code
       res.status(statusCode).json(data); 

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