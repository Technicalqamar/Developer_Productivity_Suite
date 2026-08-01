import transporter from "../config/mailer.js";
import env from "../config/env.js";
import { otpTemplate } from "../templates/otp.template.js";

const OTP_EMAIL_SUBJECT = "Developer Productivity Suite - Password Reset OTP";

export const sendOtpEmail = async ({ to, otp, expiresInMinutes }) => {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject: OTP_EMAIL_SUBJECT,
    html: otpTemplate({ otp, expiresInMinutes }),
  });
};
