import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import * as dashboardController from "../controllers/dashboard.controller.js";

const router = Router();

router.get(
  "/admin",
  authMiddleware,
  authorize("admin"),
  dashboardController.adminDashboard
);
router.get(
  "/developer",
  authMiddleware,
  authorize("developer"),
  dashboardController.developerDashboard
);

export default router;
