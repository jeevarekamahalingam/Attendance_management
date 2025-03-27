import { RequestHandler, Router } from "express";
import { getRoles } from "./controller";

const getRolesHandler:RequestHandler =async (req,res, next) => {
    try {
       const data= await getRoles(req,res);
       const statusCode:any=data.code
       res.status(statusCode).json(data); 
   }
   catch(error){
       console.log(error);
       next(error);
   }
};

const roleRoute=Router();

roleRoute.get('/getRoles',getRolesHandler);

export default roleRoute;