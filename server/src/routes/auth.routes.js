import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import validate from "../validations/validate.js";
import {
  registerSchema,
  developerRegisterSchema,
  developerLoginSchema,
  adminLoginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from "../validations/auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post(
  "/developer/register",
  validate(developerRegisterSchema),
  authController.registerDeveloper
);
router.post(
  "/developer/login",
  validate(developerLoginSchema),
  authController.loginDeveloper
);
router.post(
  "/admin/login",
  validate(adminLoginSchema),
  authController.loginAdmin
);
router.post(
  "/admin/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
router.post(
  "/admin/verify-otp",
  validate(verifyOtpSchema),
  authController.verifyOtp
);
router.post(
  "/admin/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.getCurrentUser);

export default router;
