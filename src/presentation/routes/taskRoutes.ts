import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { InMemoryTaskRepository } from "../../infrastructure/repositories/InMemoryTaskRepository";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { StartTaskUseCase } from "../../application/use-cases/StartTaskUseCase";
import { TypeORMTaskRepository } from "../../infrastructure/database/typeorm/repositories/TypeORMTaskRepository";

const router = Router();

// const reposkitory = new InMemoryTaskRepository();
const repository = new TypeORMTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(repository);
const startTaskUseCase = new StartTaskUseCase(repository);

const controller = new TaskController(createTaskUseCase, startTaskUseCase);

router.post("/", (req, res) => controller.create(req, res));
router.patch("/:id/start", (req, res) => controller.start(req, res));

export const taskRoutes = router;
