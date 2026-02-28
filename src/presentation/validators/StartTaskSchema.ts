import { z } from "zod";

export const StartTaskSchema = z.object({
  id: z.uuid("Invalid task id"),
});
