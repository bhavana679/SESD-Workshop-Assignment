import { Router } from "express";
import { Routes } from "../utils/route.Interface";
import  AuthController  from "../controllers/auth.controller";

export class AuthRoutes implements Routes {
  public path="/api/auth";
  public router=Router();
  private controller=AuthController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/register",async (req,res,next) => {
      try {
        await this.controller.register(req,res,next);
      } catch (error) {
        next(error);
      }
    });
    this.router.post("/login",async (req,res,next) => {
      try {
        await this.controller.login(req,res,next);
      } catch (error) {
        next(error);
      }
    });
  }
}
