import { RequestHandler, Router } from "express";
import {getAttendenceCount,getCheckinCheckout,newCheckin,checkOut,getTotalAttendenceDetail} from './controller'
const countAttendenceHandler:RequestHandler =async (req,res, next) => {
    try {
        await getAttendenceCount(req,res);
    } catch (error) {
        next(error);
    }
};
const checkinCheckoutHandler:RequestHandler =async (req,res, next) => {
    try {
        await getCheckinCheckout(req,res);
    } catch (error) {
        next(error);
    }
};
const newCheckinHandler:RequestHandler =async (req,res, next) => {
    try {
        await newCheckin(req,res);
    } catch (error) {
        next(error);
    }
};
const checkoutHandler:RequestHandler=async(req,res,next)=>{
    try {
        await checkOut(req,res);
    } catch (error) {
        next(error);
    }
}

const getTotalAttendenceDetailHandler:RequestHandler=async(req,res,next)=>{
    try {
        await getTotalAttendenceDetail(req,res);
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