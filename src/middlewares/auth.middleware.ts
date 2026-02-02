import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

export const protect=(req:Request,res:Response,next:NextFunction)=>{
    let token;

    if (req.headers.authorization&&req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new ApiError(401,"Not authorized to access this route"));
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
        (req as any).user = decoded;
        next();
    } catch (error) {
        return next(new ApiError(401,"Session expired or invalid token"));
    }
};
