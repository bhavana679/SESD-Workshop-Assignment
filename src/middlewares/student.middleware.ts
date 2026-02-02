import { Request,Response,NextFunction } from "express";
import  ApiError from "../utils/ApiError";


export const validateStudent=(req:Request,res:Response,next:NextFunction) => {
  const { name,email,age,course } = req.body;

  if (!name || name.length < 2) {
    return next(new ApiError(400, "Name must be at least 2 characters"));
  }

  if (!email || !email.includes("@")) {
    return next(new ApiError(400, "Valid email is required"));
  }

  if (!age || age < 1) {
    return next(new ApiError(400, "Valid age is required"));
  }

  if (!course || course.length < 2) {
    return next(new ApiError(400, "Course must be at least 2 characters"));
  }

  next();
};


export const validateUpdateStudent=(req:Request,res:Response,next:NextFunction) => {
  const { name,email,age } = req.body;

  if (name && name.length < 2) {
    return next(new ApiError(400, "Name must be at least 2 characters"));
  }

  if (email && !email.includes("@")) {
    return next(new ApiError(400, "Valid email is required"));
  }

  if (age && age<1) {
    return next(new ApiError(400, "Valid age is required"));
  }

  next();
};
