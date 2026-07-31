import User from "../models/User.js";
import env from "../config/env.js";
import { hashPassword } from "../utils/password.js";

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("✔ Initial admin already exists.");
    return;
  }

  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables.");
  }

  const hashedPassword = await hashPassword(env.ADMIN_PASSWORD);

  await User.create({
    fullName: "System Administrator",
    email: env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
    isActive: true,
    isVerified: true,
  });

  console.log("✔ Initial admin created successfully.");
};

export default seedAdmin;
