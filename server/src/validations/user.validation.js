import { z } from "zod";

export const registerUserSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
