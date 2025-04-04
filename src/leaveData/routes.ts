import { RequestHandler, Router } from "express";
import { applyLeave,getAllLeaveForAUser,
        changeLeaveStatus,
        listTeamMeamberRequest,
        getALeaveInfoOfAUserByLeaveID} from "./controller";


const applyLeaveHandler:RequestHandler =async (req,res, next) => {
    try {
       const result= await applyLeave(req,res);
       const statusCode:any=result.code
       res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const getAllLeaveForAUserHandler:RequestHandler =async (req,res, next) => {
    try {
      const result=  await getAllLeaveForAUser(req,res);
      const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const changeLeaveStatusHandler:RequestHandler =async (req,res, next) => {
    try {
      const result=  await changeLeaveStatus(req,res);
      const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const listTeamMeamberRequestHandler:RequestHandler =async (req,res, next) => {
    try {
       const result= await listTeamMeamberRequest(req,res);
       const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const getALeaveInfoOfAUserByLeaveIDRequestHandler:RequestHandler =async (req,res, next) => {
    try {
       const result= await getALeaveInfoOfAUserByLeaveID(req,res);
       const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};


const leaveDataRoute = Router();

leaveDataRoute.post('/applyLeave',applyLeaveHandler);
leaveDataRoute.post('/displayRequests',getAllLeaveForAUserHandler);
leaveDataRoute.put('/changeStatus',changeLeaveStatusHandler);
leaveDataRoute.get('/getListOfTeamMembers/:reporting_manager_uuid',listTeamMeamberRequestHandler);
leaveDataRoute.get('/getALeaveDetailOfUserByLeaveID/:leave_id',getALeaveInfoOfAUserByLeaveIDRequestHandler)

export  default leaveDataRoute;
