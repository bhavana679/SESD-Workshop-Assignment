import express, { Application } from "express";
import cors from "cors";
import { Routes } from "./utils/route.Interface";
import { errorHandler } from "./middlewares/errorHandler";
import { connectDB } from "./config/db";

class App {
  public app: Application;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = Number(process.env.PORT) || 5000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.connectDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    this.app.get("/", (req, res) => {
      res.json({ message: "Student Management API running" });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private async connectDatabase() {
    await connectDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

export default App;
