import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from '../interfaces/student.interface';

export interface IStudentDocument extends IStudent, Document { }

const StudentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true,'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true,'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        age: {
            type: Number,
            required: [true,'Age is required'],
            min: [1,'Age must be at least 1']
        },
        course: {
            type: String,
            required: [true,'Course is required'],
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const StudentModel = mongoose.model<IStudentDocument>('Student', StudentSchema);

export default StudentModel;
