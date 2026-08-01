import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import * as testController from "../controllers/test.controller.js";

const router = Router();

router.get(
  "/developer",
  authMiddleware,
  authorize("developer"),
  testController.developerAccess
);
router.get(
  "/admin",
  authMiddleware,
  authorize("admin"),
  testController.adminAccess
);
router.get(
  "/profile",
  authMiddleware,
  authorize("admin", "developer"),
  testController.profile
);

export default router;
