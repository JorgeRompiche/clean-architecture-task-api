import { randomUUID } from "crypto";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO";

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(input: CreateTaskDTO): Promise<Task> {
    const task = new Task({
      id: randomUUID(),
      title: input.title,
      description: input.description,
      projectId: input.projectId,
      ownerId: input.ownerId,
    });

    return await this.taskRepository.save(task);
  }
}
