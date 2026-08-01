import crypto from "crypto";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { sendOtpEmail } from "./mail.service.js";

const OTP_EXPIRES_MINUTES = 5;

const createUserAccount = async ({ fullName, email, password, role }) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new AppError("Email already exists.", 409);
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    fullName,
    email,
    password: hashed,
    role,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
};

export const registerUser = async ({ fullName, email, password }) => {
  return createUserAccount({ fullName, email, password, role: "developer" });
};

export const registerDeveloper = async ({ fullName, email, password }) => {
  return createUserAccount({ fullName, email, password, role: "developer" });
};

const authenticateUser = async ({ email, password, requiredRole }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const passwordMatches = await comparePassword(password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is inactive.", 403);
  }

  if (user.role !== requiredRole) {
    throw new AppError("Access denied.", 403);
  }

  const token = generateAccessToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginDeveloper = async ({ email, password }) => {
  return authenticateUser({ email, password, requiredRole: "developer" });
};

export const loginAdmin = async ({ email, password }) => {
  return authenticateUser({ email, password, requiredRole: "admin" });
};

export const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {
    throw new AppError("Invalid email or account.", 400);
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpHash = await hashPassword(otp);

  user.otpHash = otpHash;
  user.otpExpiresAt = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);
  await user.save();

  try {
    await sendOtpEmail({
      to: user.email,
      otp,
      expiresInMinutes: OTP_EXPIRES_MINUTES,
    });
  } catch {
    throw new AppError("Failed to send OTP email. Please try again.", 500);
  }
};

const findAdminWithOtp = async (email) => {
  const user = await User.findOne({ email }).select("+otpHash");

  if (!user) {
    throw new AppError("Invalid email or account.", 404);
  }

  if (user.role !== "admin") {
    throw new AppError("Access denied.", 403);
  }

  if (!user.otpHash) {
    throw new AppError("No active OTP found.", 400);
  }

  return user;
};

const assertOtpValid = async (user, otp) => {
  if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    throw new AppError("OTP expired.", 400);
  }

  const otpMatches = await comparePassword(otp, user.otpHash);

  if (!otpMatches) {
    throw new AppError("Invalid OTP.", 400);
  }
};

export const verifyOtp = async ({ email, otp }) => {
  const user = await findAdminWithOtp(email);
  await assertOtpValid(user, otp);
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const user = await findAdminWithOtp(email);
  await assertOtpValid(user, otp);

  const hashed = await hashPassword(newPassword);

  user.password = hashed;
  user.otpHash = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
};

export const loginUser = async () => {};

export const logoutUser = async () => {};

export const findUserById = async () => {};
