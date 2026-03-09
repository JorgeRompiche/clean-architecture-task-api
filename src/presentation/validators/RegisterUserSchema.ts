import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z.email().min(8, "Email must habe at least 8 characters"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
