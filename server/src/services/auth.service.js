import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
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

export const loginUser = async () => {};

export const logoutUser = async () => {};

export const findUserById = async () => {};
