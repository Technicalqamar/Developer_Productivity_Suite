import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
import AppError from "../utils/AppError.js";

export const registerUser = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new AppError("Email already exists.", 409);
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    fullName,
    email,
    password: hashed,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async () => {};

export const logoutUser = async () => {};

export const findUserById = async () => {};
