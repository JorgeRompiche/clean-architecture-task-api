import request from "supertest";
import { app } from "../../main/app";

describe("Task API Integration", () => {
  it("Should create a task", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Integration Task",
      projectId: "project-1",
      description: "Integration Task description",
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.status).toBe("PENDING");
  });

  it("Should start a task", async () => {
    const createResponse = await request(app).post("/tasks").send({
      title: "Task to start",
      projectId: "project-1",
      description: "Task to start description",
    });

    const taskId = createResponse.body.id;
    const startResponse = await request(app).patch(`/tasks/${taskId}/start`);

    expect(startResponse.status).toBe(200);
    expect(startResponse.body.status).toBe("IN_PROGRESS");
  });

  it("Should return 400 for invalid title", async () => {
    const response = await request(app).post("/tasks").send({
      title: "a",
      projectId: "project-1",
      description: "Description",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("Should return 400 when starting non-existent task", async () => {
    const response = await request(app).patch("/tasks/non-existent-id/start");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
