import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import * as toolController from "../controllers/tool.controller.js";
import validate from "../validations/validate.js";
import validateQuery from "../validations/validateQuery.js";
import {
  createToolSchema,
  updateToolSchema,
  updateToolStatusSchema,
  updateToolVisibilitySchema,
  listToolsQuerySchema,
} from "../validations/tool.validation.js";

const adminToolRouter = Router();

adminToolRouter.use(authMiddleware, authorize("admin"));

adminToolRouter.post("/", validate(createToolSchema), toolController.createTool);
adminToolRouter.get(
  "/",
  validateQuery(listToolsQuerySchema),
  toolController.listTools
);
adminToolRouter.get("/:id", toolController.getToolById);
adminToolRouter.put(
  "/:id",
  validate(updateToolSchema),
  toolController.updateTool
);
adminToolRouter.patch(
  "/:id/status",
  validate(updateToolStatusSchema),
  toolController.updateToolStatus
);
adminToolRouter.patch(
  "/:id/visibility",
  validate(updateToolVisibilitySchema),
  toolController.updateToolVisibility
);
adminToolRouter.post("/:id/publish", toolController.publishTool);
adminToolRouter.post("/:id/unpublish", toolController.unpublishTool);
adminToolRouter.post("/:id/deprecate", toolController.deprecateTool);
adminToolRouter.post("/:id/restore", toolController.restoreTool);
adminToolRouter.delete("/:id", toolController.deleteTool);

const developerToolRouter = Router();

developerToolRouter.use(authMiddleware, authorize("developer"));
developerToolRouter.get("/", toolController.listPublishedTools);

export { adminToolRouter, developerToolRouter };
