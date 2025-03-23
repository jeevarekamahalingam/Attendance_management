import { RequestHandler, Router } from "express";
import {isUUIDpresent , getUserDetail,getTeamMembers,createUser } from "./controller";

const isUUIDpresentHandler:RequestHandler =async (req,res, next) => {
    try {
        await isUUIDpresent(req,res);
    } catch (error) {
        next(error);
    }
};

const getUserDetailHandler:RequestHandler=async(req,res,next)=>{
    try{
        const data = await getUserDetail(req,res);
        res.send(data);
    }
    catch(error){
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
const userRoute = Router();


userRoute.get("/userExitCheck/:uuid",isUUIDpresentHandler);
userRoute.get("/userData/:uuid",getUserDetailHandler);
userRoute.get("/teammembers/:user_name", retriveTeamMembers);
userRoute.post("/createUser",createNewUser);


export default userRoute;
