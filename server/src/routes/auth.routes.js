import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import validate from "../validations/validate.js";
import { registerSchema } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.getCurrentUser);

export default router;
