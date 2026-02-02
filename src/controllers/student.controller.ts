import { Request,Response,NextFunction } from 'express';
import studentService from '../services/student.service';

class StudentController {
    async create(req:Request,res:Response,next:NextFunction) {
        try {
            const student=await studentService.createStudent(req.body);
            res.status(201).json({
                success:true,
                message:"Student created successfully",
                data: student
            });
        } catch (error) {
            next(error); 
        }
    }


    async getById(req:Request,res:Response,next:NextFunction) {
        try {
            const student=await studentService.getStudentById(req.params.id as string);
            res.status(200).json({
                success:true,
                data:student
            });
        } catch (error) {
            next(error);
        }
    }


    async getAll(req:Request,res:Response,next:NextFunction) {
        try {
            const result=await studentService.getAllStudents(req.query);
            res.status(200).json({
                success:true,
                ...result
            });
        } catch (error) {
            next(error);
        }
    }


    async update(req:Request,res:Response,next:NextFunction) {
        try {
            const student=await studentService.updateStudent(req.params.id as string,req.body);
            res.status(200).json({
                success:true,
                message:"Student updated successfully",
                data: student
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req:Request,res:Response,next:NextFunction) {
        try {
            await studentService.deleteStudent(req.params.id as string);
            res.status(200).json({
                success:true,
                message:"Student deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}


export default new StudentController();
