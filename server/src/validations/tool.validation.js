import { z } from "zod";

export const TOOL_STATUSES = ["draft", "testing", "published", "deprecated"];

const slugField = z
  .string({ required_error: "Slug is required" })
  .min(1, "Slug is required")
  .max(100, "Slug must be at most 100 characters")
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase letters, numbers and hyphens only"
  );

const nameField = z
  .string({ required_error: "Tool name is required" })
  .min(3, "Tool name must be at least 3 characters")
  .max(100, "Tool name must be at most 100 characters")
  .trim();

const categoryField = z
  .string({ required_error: "Category is required" })
  .min(1, "Category is required")
  .max(50, "Category must be at most 50 characters")
  .trim();

const descriptionField = z
  .string()
  .max(1000, "Description must be at most 1000 characters")
  .trim();

const iconField = z
  .string()
  .max(200, "Icon must be at most 200 characters")
  .trim();

const versionField = z
  .string()
  .max(50, "Version must be at most 50 characters")
  .trim();

const statusField = z
  .enum(TOOL_STATUSES, { message: "{VALUE} is not a supported status" })
  .optional();

const developerVisibleField = z.boolean().optional();
const comingSoonField = z.boolean().optional();
const isActiveField = z.boolean().optional();

const displayOrderField = z
  .number()
  .int("Display order must be a whole number")
  .min(0, "Display order must be 0 or greater")
  .optional();

export const createToolSchema = z.object({
  name: nameField,
  slug: slugField,
  category: categoryField,
  description: descriptionField.optional(),
  icon: iconField.optional(),
  version: versionField.optional(),
  status: statusField,
  developerVisible: developerVisibleField,
  comingSoon: comingSoonField,
  displayOrder: displayOrderField,
  isActive: isActiveField,
});

export const updateToolSchema = createToolSchema.partial();

export const updateToolStatusSchema = z.object({
  status: z.enum(TOOL_STATUSES, {
    message: "{VALUE} is not a supported status",
  }),
});

export const updateToolVisibilitySchema = z.object({
  developerVisible: z.boolean({
    required_error: "developerVisible is required",
    invalid_type_error: "developerVisible must be a boolean",
  }),
});

export const listToolsQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  status: z.enum(TOOL_STATUSES).optional(),
  category: z.string().trim().max(50).optional(),
  developerVisible: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});
