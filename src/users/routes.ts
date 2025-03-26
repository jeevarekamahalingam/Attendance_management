import { RequestHandler, Router } from "express";
import {isUUIDpresent , getUserDetail,getTeamMembers,createUser,getLeaveStatForAUser } from "./controller";

const isUUIDpresentHandler:RequestHandler =async (req,res, next) => {
    try {
        await isUUIDpresent(req,res);
    } catch (error) {
        next(error);
    }
};

const getUserDetailHandler:RequestHandler=async(req,res,next)=>{
    try{
       await getUserDetail(req,res);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

const retriveTeamMembers:RequestHandler =async (req, res, next) => {
    try {
        const data = await getTeamMembers(req);
        res.send(data);
    } catch (error) {
        next(error);
    }
};
const createNewUser:RequestHandler=async(req,res,next)=>{
    try {
        const data = await createUser(req,res);
        res.status(201).json(data);
      } catch (error) {
        next(error);
      }
}
const getLeaveStatForAUserRequestHandler:RequestHandler =async (req,res, next) => {
    try {
        await getLeaveStatForAUser(req,res);
    } catch (error) {
        next(error);
    }
};
const userRoute = Router();


userRoute.get("/userExitCheck/:uuid",isUUIDpresentHandler);
userRoute.get("/userData/:uuid",getUserDetailHandler);
userRoute.get("/teammembers/:user_name", retriveTeamMembers);
userRoute.post("/createUser",createNewUser);
userRoute.get('/getLeaveStatForAUser/:uuid_',getLeaveStatForAUserRequestHandler)



export default userRoute;
