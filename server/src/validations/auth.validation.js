import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be at most 100 characters"),
  email: z
    .string()
    .email("Please provide a valid email")
    .transform((e) => e.toLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
});

export const loginSchema = {};
