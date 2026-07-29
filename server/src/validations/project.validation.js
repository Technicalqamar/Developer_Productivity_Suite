import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z.string().min(1).max(200),
  tool: z.enum(["bootstrap", "admin", "auth", "schema", "api-builder"]),
  configuration: z.record(z.unknown()).optional(),
});
