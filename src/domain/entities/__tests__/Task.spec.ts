import { Task } from "../Task";
import { TaskStatus } from "../TaskStatus";
import {
  InvalidTaskTitleError,
  InvalidStatusTransitionError,
} from "../../errors/TaskErrors";

describe("Task Entity", () => {
  const baseProps = {
    id: "task-1",
    title: "Valid Task",
    projectId: "project-1",
  };

  describe("Creation", () => {
    it("Should create a task with default status PENDING", () => {
      const task = new Task(baseProps);

      expect(task.status).toBe(TaskStatus.PENDING);
      expect(task.title).toBe("Valid Task");
    });

    it("Should throw error if title is too short", () => {
      expect(() => {
        new Task({
          ...baseProps,
          title: "ab",
        });
      }).toThrow(InvalidTaskTitleError);
    });
  });

  describe("Start transition", () => {
    it("Should transition from PENDING to IN_PROGRESS status", () => {
      const task = new Task(baseProps);
      task.start();
      expect(task.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it("Should not allow start if status already IN_PROGRESS", () => {
      const task = new Task(baseProps);
      task.start();
      expect(() => task.start()).toThrow(InvalidStatusTransitionError);
    });
  });

  describe("Complete transition", () => {
    it("Should transition from IN_PROGRESS to COMPLETED status", () => {
      const task = new Task(baseProps);
      task.start();
      task.complete();
      expect(task.status).toBe(TaskStatus.COMPLETED);
    });

    it("Should not allow complete if still PENDING", () => {
      const task = new Task(baseProps);
      expect(() => task.complete()).toThrow(InvalidStatusTransitionError);
    });

    it("Should not allow complete if already COMPLETED", () => {
      const task = new Task(baseProps);
      task.start();
      task.complete();
      expect(() => task.complete()).toThrow(InvalidStatusTransitionError);
    });
  });

  describe("Update tiele", () => {
    it("Should update title if valid", () => {
      const task = new Task(baseProps);
      task.updateTitle("New Valid Title");
      expect(task.title).toBe("New Valid Title");
    });

    it("Should throw error if new title is invalid", () => {
      const task = new Task(baseProps);
      expect(() => task.updateTitle("a")).toThrow(InvalidTaskTitleError);
    });
  });
});
