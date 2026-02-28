import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(5, "Title must have at least 5 characters"),
  description: z.string().min(5, "Description must have at least 5 characters"),
  projectId: z.string().min(1, "ProjectId is required"),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
