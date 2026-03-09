import express from "express";
import { taskRoutes } from "../presentation/routes/taskRoutes";
import { errorHandler } from "../presentation/middleware/errorHandler";
import { userRoutes } from "../presentation/routes/authRoutes";

export const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);
