import { Router } from "express";
import { Routes } from "../utils/route.Interface";
import StudentController from "../controllers/student.controller";
import { protect } from "../middlewares/auth.middleware";
import { validateStudent, validateUpdateStudent } from "../middlewares/student.middleware";

export class StudentRoutes implements Routes {
  public path = "/api/students";
  public router = Router();
  private controller = StudentController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", protect, async (req, res, next) => {
      try {
        await this.controller.getAll(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    this.router.get("/:id", protect, async (req, res, next) => {
      try {
        await this.controller.getById(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    this.router.post("/", protect, validateStudent, async (req, res, next) => {
      try {
        await this.controller.create(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    this.router.put("/:id", protect, validateUpdateStudent, async (req, res, next) => {
      try {
        await this.controller.update(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    this.router.delete("/:id", protect, async (req, res, next) => {
      try {
        await this.controller.delete(req, res, next);
      } catch (error) {
        next(error);
      }
    });
  }
}
