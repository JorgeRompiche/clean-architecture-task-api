import { CreateTaskUseCase } from "../CreateTaskUseCase";
import { InMemoryTaskRepository } from "../../../infrastructure/repositories/InMemoryTaskRepository";

describe("CreateTaskUseCase", () => {
  let repository: InMemoryTaskRepository;
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    useCase = new CreateTaskUseCase(repository);
  });

  it("Should create and persist a new task", async () => {
    const task = await useCase.execute({
      title: "New Task",
      projectId: "project-1",
      description: "Task description",
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe("New Task");
    expect(task.projectId).toBe("project-1");

    const persisted = await repository.findById(task.id);
    expect(persisted).not.toBeNull();
  });

  it("Should throw error if title is invalid", async () => {
    await expect(
      useCase.execute({
        title: "a",
        projectId: "project-1",
        description: "Task description",
      }),
    ).rejects.toThrow();
  });
});
