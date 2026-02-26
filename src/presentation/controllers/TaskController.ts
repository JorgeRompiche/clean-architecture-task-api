import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { StartTaskUseCase } from "../../application/use-cases/StartTaskUseCase";

export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private startTaskUseCase: StartTaskUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { title, projectId, description } = req.body;

    const task = await this.createTaskUseCase.execute({
      title,
      projectId,
      description,
    });

    return res.status(201).json(task);
  }

  async start(req: Request, res: Response): Promise<Response> {
    const id = String(req.params.id);
    const task = await this.startTaskUseCase.execute({ taskId: id });
    return res.status(200).json(task);
  }
}
