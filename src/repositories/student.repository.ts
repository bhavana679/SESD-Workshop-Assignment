import StudentModel, { IStudentDocument } from '../models/student.model';
import { IStudent } from '../interfaces/student.interface';

class StudentRepository {
    async createStudent(studentData: IStudent): Promise<IStudentDocument> {
        const student = new StudentModel(studentData);
        return await student.save();
    }

    async getStudentById(studentId: string): Promise<IStudentDocument | null> {
        return await StudentModel.findById(studentId);
    }

    async getAllStudents(filter: any = {}, sort: any = {}, skip: number = 0, limit: number = 10): Promise<IStudentDocument[]> {
        return await StudentModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);
    }
    async countStudents(filter:any={}): Promise<number> {
        return await StudentModel.countDocuments(filter);
    }
    async updateStudent(studentId: string, updateData: Partial<IStudent>): Promise<IStudentDocument | null> {
        return await StudentModel.findByIdAndUpdate(
            studentId,
            updateData,
            { new: true, runValidators: true } 
        );
    }
    async deleteStudent(studentId: string): Promise<IStudentDocument | null> {
        return await StudentModel.findByIdAndDelete(studentId);
    }
}

export default new StudentRepository();
