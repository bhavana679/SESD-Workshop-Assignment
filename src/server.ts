import dotenv from "dotenv";
import App from "./app";
import { StudentRoutes } from "./routes/student.routes";
import { AuthRoutes } from "./routes/auth.routes";
dotenv.config();
const app = new App([
  new AuthRoutes(),
  new StudentRoutes(),
]);

app.listen();
