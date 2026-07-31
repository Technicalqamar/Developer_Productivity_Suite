import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

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

export const loginDeveloper = async ({ email, password }) => {
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

  if (user.role !== "developer") {
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

export const loginUser = async () => {};

export const logoutUser = async () => {};

export const findUserById = async () => {};
