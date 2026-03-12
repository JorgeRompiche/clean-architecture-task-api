import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class FindTasksByOwnerUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(ownerId: string): Promise<Task[]> {
    return await this.taskRepository.findByOwner(ownerId);
  }
}
