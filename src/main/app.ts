import express from "express";
import { taskRoutes } from "../presentation/routes/taskRoutes";
import { errorHandler } from "../presentation/middleware/errorHandler";

export const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use(errorHandler);
