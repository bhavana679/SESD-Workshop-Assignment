import studentRepository from '../repositories/student.repository';
import { IStudent } from '../interfaces/student.interface';
import ApiError from '../utils/ApiError';

class StudentService {
    async createStudent(studentData: IStudent) {
        const data = (studentData as any).cleanBody || studentData;
        if (!data.name || !data.email) {
            throw new ApiError(400, "Name and Email are required to register a student");
        }
        return await studentRepository.createStudent(data);
    }

    async getStudentById(id: string) {
        const student = await studentRepository.getStudentById(id); 
        if (!student) {
            throw new ApiError(404, `Student with ID ${id} not found`);
        }
        return student;
    }

    async getAllStudents(query: any) {
        const { search, course, sortBy, order, page, limit } = query;
        const filter: any = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }
        if (course) {
            filter.course = course;
        }
        const sort: any = {};
        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        } else {
            sort.createdAt = -1;
        }
        const pageNum=Math.max(1, parseInt(page) || 1);
        const limitNum=Math.max(1, parseInt(limit) || 10);
        const skip=(pageNum-1)*limitNum;

        const students=await studentRepository.getAllStudents(filter, sort, skip, limitNum);
        const total=await studentRepository.countStudents(filter);

        return {
            students,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        };
    }

    async updateStudent(id: string,updateData: Partial<IStudent>) {
        const data=(updateData as any).cleanBody || updateData;

        const student=await studentRepository.updateStudent(id,data);

        if (!student) {
            throw new ApiError(404, "Cannot update: Student not found");
        }

        return student;
    }

    async deleteStudent(id: string) {
        const student=await studentRepository.deleteStudent(id);
        if (!student) {
            throw new ApiError(404, "Cannot delete: Student not found");
        }
        return student;
    }
}

export default new StudentService();
