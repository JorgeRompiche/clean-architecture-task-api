import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { TaskNotFoundError } from "../../domain/errors/TaskNotFoundError";
import { StartTaskDTO } from "../dtos/StartTaskDTO";
import { Task } from "../../domain/entities/Task";

export class StartTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(input: StartTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findById(input.taskId);
    if (!task) throw new TaskNotFoundError(input.taskId);

    task.start();

    await this.taskRepository.save(task);

    return task;
  }
}
