import { DomainError } from "./DomainError";

export class TaskNotFoundError extends DomainError {
  constructor(taskId: string) {
    super(`Task with id ${taskId} not found.`, 404);
  }
}
