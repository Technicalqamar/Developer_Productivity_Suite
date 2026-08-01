import nodemailer from "nodemailer";
import env from "./env.js";

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: parseInt(env.MAIL_PORT, 10),
  secure: env.MAIL_PORT === "465",
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export default transporter;
