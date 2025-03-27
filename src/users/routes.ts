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
        const data=await isUUIDpresent(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 

    } catch (error) {
        next(error);
    }
};

const getUserDetailHandler:RequestHandler=async(req,res,next)=>{

    
    try{
       const data=await getUserDetail(req,res);
       const statusCode:any=data.code
       res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

const retriveTeamMembers:RequestHandler =async (req, res, next) => {
    try {
        const data = await getTeamMembers(req);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
};
const createNewUser:RequestHandler=async(req,res,next)=>{
    try {
        const data = await createUser(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

const updateUserByUserHandler:RequestHandler=async(req,res,next)=>{
    try {
        const data = await updateUserByUser(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
}


const updateUserByHRrHandler:RequestHandler=async(req,res,next)=>{
    try {
        const data = await updateUserByHR(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
}
const getLeaveStatForAUserRequestHandler:RequestHandler =async (req,res, next) => {
    try {
        const data=await getLeaveStatForAUser(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
        next(error);
    }
};
const getListOfReportingManagersRequestHandler:RequestHandler =async (req,res, next) => {
    try {
        const data=await getListOfReportingManagers(req,res);
        const statusCode:any=data.code
        res.status(statusCode).json(data); 
    }
    catch(error){
        console.log(error);
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
