import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { InMemoryTaskRepository } from "../../infrastructure/repositories/InMemoryTaskRepository";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { StartTaskUseCase } from "../../application/use-cases/StartTaskUseCase";
import { TypeORMTaskRepository } from "../../infrastructure/database/typeorm/repositories/TypeORMTaskRepository";
import { validateRequest } from "../validators/validateRequest";
import { CreateTaskSchema } from "../validators/CreateTaskSchema";
import { StartTaskSchema } from "../validators/StartTaskSchema";

const router = Router();

const repository = new InMemoryTaskRepository();
// const repository = new TypeORMTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(repository);
const startTaskUseCase = new StartTaskUseCase(repository);

const controller = new TaskController(createTaskUseCase, startTaskUseCase);

router.post("/", validateRequest({ body: CreateTaskSchema }), (req, res) =>
  controller.create(req, res),
);
router.patch(
  "/:id/start",
  validateRequest({ params: StartTaskSchema }),
  (req, res) => controller.start(req, res),
);

export const taskRoutes = router;
