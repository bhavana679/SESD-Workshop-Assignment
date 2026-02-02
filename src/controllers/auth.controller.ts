import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import Student from '../models/student.model';
class AuthController {
    async register(req:Request, res:Response, next:NextFunction) {
        try {
            const { name,email,password,age,course }=req.body;

            if (!name||name.length < 2) {
                throw new ApiError(400,"Name must be at least 2 characters");
            }
            if (!email || !email.includes("@")) {
                throw new ApiError(400,"Valid email is required");
            }
            if (!age || age < 1) {
                throw new ApiError(400,"Valid age is required");
            }
            if (!course ||course.length < 2) {
                throw new ApiError(400,"Course must be at least 2 characters");
            }
            const existingUser=await Student.findOne({ email });
            if (existingUser) {
                throw new ApiError(400,"User with this email already exists");
            }
            const newStudent=await Student.create({
                name,
                email,
                age,
                course
            });
            const token=jwt.sign(
                { id: newStudent._id, email: newStudent.email, role: "student" },
                process.env.JWT_SECRET || "defaultsecret",
                { expiresIn: "1h" }
            );
            res.status(201).json({
                success: true,
                message: "Registration successful",
                token: token,
                data: {
                    id: newStudent._id,
                    name: newStudent.name,
                    email: newStudent.email
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req:Request,res:Response,next:NextFunction) {
        try {
            const { email,password }=req.body;

            const ADMIN_EMAIL="admin@example.com";
            const ADMIN_PASSWORD="password123";

            if (email!==ADMIN_EMAIL||password!==ADMIN_PASSWORD) {
                throw new ApiError(401,"Invalid email or password");
            }

            const token=jwt.sign(
                { email:ADMIN_EMAIL,role:"admin" },
                process.env.JWT_SECRET || "defaultsecret",
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                message: "Login successful",
                token: token
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
