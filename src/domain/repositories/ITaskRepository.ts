import { Task } from "../entities/Task";

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByProject(projectId: string): Promise<Task[]>;
}
