import { RequestHandler, Router } from "express";
import {isUUIDpresent ,
     getUserDetail,
     getTeamMembers,
     createUser,
     getLeaveStatForAUser,
     getListOfReportingManagers ,
     updateUserByUser,
     updateUserByHR} from "./controller";

const isUUIDpresentHandler:RequestHandler =async (req,res, next) => {
    try {
        const result=await isUUIDpresent(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 

    } catch (error) {
        next(error);
    }
};

const getUserDetailHandler:RequestHandler=async(req,res,next)=>{

    
    try{
       const result=await getUserDetail(req,res);
       const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}

const retriveTeamMembers:RequestHandler =async (req, res, next) => {
    try {
        const result = await getTeamMembers(req);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const createNewUser:RequestHandler=async(req,res,next)=>{
    try {
        const result = await createUser(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}

const updateUserByUserHandler:RequestHandler=async(req,res,next)=>{
    try {
        const result = await updateUserByUser(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}


const updateUserByHRrHandler:RequestHandler=async(req,res,next)=>{
    try {
        const result = await updateUserByHR(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
}
const getLeaveStatForAUserRequestHandler:RequestHandler =async (req,res, next) => {
    try {
        const result=await getLeaveStatForAUser(req,res);
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const getListOfReportingManagersRequestHandler:RequestHandler =async (req,res, next) => {
    try {
        const result=await getListOfReportingManagers();
        const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};
const userRoute = Router();


userRoute.get("/userExitCheck/:uuid",isUUIDpresentHandler);
userRoute.get("/userData/:uuid",getUserDetailHandler);
userRoute.get("/teammembers/:uuid", retriveTeamMembers);
userRoute.post("/createUser",createNewUser);
userRoute.put("/updateUserByUser",updateUserByUserHandler)
userRoute.put("/updateUserByHR",updateUserByHRrHandler)
userRoute.get('/getLeaveStatForAUser/:uuid_',getLeaveStatForAUserRequestHandler)
userRoute.get('/getListOfReportingManagers',getListOfReportingManagersRequestHandler)



export default userRoute;
