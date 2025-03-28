import { RequestHandler, Router } from "express";
import { getRoles } from "./controller";

const getRolesHandler:RequestHandler =async (req,res, next) => {
    try {
       const result= await getRoles();
       const statusCode:any=result.code
        res.status(statusCode).json(result); 
 
    } catch (error) {
        next(error);
    }
};

const roleRoute=Router();

roleRoute.get('/getRoles',getRolesHandler);

export default roleRoute;