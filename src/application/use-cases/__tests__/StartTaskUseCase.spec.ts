import { InMemoryTaskRepository } from "../../../infrastructure/repositories/InMemoryTaskRepository";
import { CreateTaskUseCase } from "../CreateTaskUseCase";
import { StartTaskUseCase } from "../StartTaskUseCase";
import { TaskStatus } from "../../../domain/entities/TaskStatus";
import { TaskNotFoundError } from "../../../domain/errors/TaskNotFoundError";

describe("StartTaskUseCase", () => {
  let repository: InMemoryTaskRepository;
  let createUseCase: CreateTaskUseCase;
  let startUseCase: StartTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    createUseCase = new CreateTaskUseCase(repository);
    startUseCase = new StartTaskUseCase(repository);
  });

  it("Should transition task to IN_PROGRESS", async () => {
    const task = await createUseCase.execute({
      title: "Task to start",
      projectId: "project-1",
      description: "Task description",
    });
    const updated = await startUseCase.execute({ taskId: task.id });
    expect(updated.status).toBe(TaskStatus.IN_PROGRESS);
  });

  it("Should throw error if task does not exist", async () => {
    await expect(
      startUseCase.execute({ taskId: "non-existent-id" }),
    ).rejects.toThrow(TaskNotFoundError);
  });

  it("Should not allow starting an already started task", async () => {
    const task = await createUseCase.execute({
      title: "Already started task",
      projectId: "project-1",
      description: "Already started tadk description",
    });

    await startUseCase.execute({ taskId: task.id });
    await expect(startUseCase.execute({ taskId: task.id })).rejects.toThrow();
  });
});
