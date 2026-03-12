import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { StartTaskUseCase } from "../../application/use-cases/StartTaskUseCase";
import { FindTasksByOwnerUseCase } from "../../application/use-cases/FindTasksByOwnerUseCase";

export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private startTaskUseCase: StartTaskUseCase,
    private listTasksUseCase: FindTasksByOwnerUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { title, projectId, description } = req.body;

    const ownerId = req.user!.sub;

    const task = await this.createTaskUseCase.execute({
      title,
      projectId,
      description,
      ownerId,
    });

    return res.status(201).json(task);
  }

  async start(req: Request, res: Response): Promise<Response> {
    const id = String(req.params.id);
    const task = await this.startTaskUseCase.execute({ taskId: id });
    return res.status(200).json(task);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const ownerId = req.user!.sub;
    const tasks = await this.listTasksUseCase.execute(ownerId);
    return res.json(tasks);
  }
}
