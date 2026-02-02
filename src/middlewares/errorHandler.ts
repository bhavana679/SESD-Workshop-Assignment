import { Request,Response,NextFunction } from 'express';
import ApiError from '../utils/ApiError';

export const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode=err.statusCode||500;
    let message=err.message||"Internal Server Error";

    if (err.code===11000) {
        statusCode=400;
        message=`Duplicate field value entered ${Object.keys(err.keyValue)}`;
    }
    if (err.name==='ValidationError') {
        statusCode=400;
        message=Object.values(err.errors).map((val:any)=>val.message).join(', ');
    }
    if (err.name==='CastError') {
        statusCode=404;
        message=`Resource not found. Invalid: ${err.path}`;
    }
    res.status(statusCode).json({
        success:false,
        status:statusCode,
        message: message,
        stack: process.env.NODE_ENV==='production' ? null : err.stack,
    });
};
