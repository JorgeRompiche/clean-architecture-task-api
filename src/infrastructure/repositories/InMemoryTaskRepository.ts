import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((t) => t.id === id) || null;
  }

  async findByProject(projectId: string): Promise<Task[]> {
    return this.tasks.filter((t) => t.projectId === projectId);
  }
}
