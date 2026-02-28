import { Task } from "../../../../domain/entities/Task";
import { TaskORMEntity } from "../entities/TaskORMEntity";

export class TaskMapper {
  static toDomain(entity: TaskORMEntity): Task {
    return new Task({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      projectId: entity.projectId,
      status: entity.status as any,
      createdAt: entity.createdAt,
    });
  }

  static toORM(task: Task): TaskORMEntity {
    const orm = new TaskORMEntity();

    orm.id = task.id;
    orm.title = task.title;
    orm.description = task.description || ""; // TODO
    orm.projectId = task.projectId;
    orm.status = task.status;
    orm.createdAt = task.createdAt;

    return orm;
  }
}
