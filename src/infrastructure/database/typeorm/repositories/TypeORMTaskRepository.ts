import { Repository } from "typeorm";
import { ITaskRepository } from "../../../../domain/repositories/ITaskRepository";
import { Task } from "../../../../domain/entities/Task";
import { TaskORMEntity } from "../entities/TaskORMEntity";
import { TaskMapper } from "../mappers/TaskMapper";
import { AppDataSource } from "../data-source";

export class TypeORMTaskRepository implements ITaskRepository {
  private repository: Repository<TaskORMEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(TaskORMEntity);
  }

  async save(task: Task): Promise<Task> {
    const ormEntity = TaskMapper.toORM(task);
    await this.repository.save(ormEntity);
    return task;
  }
  async findById(id: string): Promise<Task | null> {
    const ormEntity = await this.repository.findOneBy({ id });
    if (!ormEntity) return null;
    return TaskMapper.toDomain(ormEntity);
  }

  async findByProject(projectId: string): Promise<Task[]> {
    const ormEntities = await this.repository.findBy({ projectId });
    return ormEntities.map((oe) => TaskMapper.toDomain(oe));
  }

  async findByOwner(ownerId: string): Promise<Task[]> {
    const ormEntities = await this.repository.findBy({ ownerId });
    return ormEntities.map((oe) => TaskMapper.toDomain(oe));
  }
}
