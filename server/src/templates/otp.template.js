export const otpTemplate = ({ otp, expiresInMinutes }) => `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
    <h2>Password Reset OTP</h2>
    <p>Hello,</p>
    <p>You requested to reset your password for the Developer Productivity Suite.</p>
    <p>Your One-Time Password (OTP) is:</p>
    <h1 style="letter-spacing: 4px;">${otp}</h1>
    <p>This OTP is valid for <strong>${expiresInMinutes} minutes</strong>.</p>
    <p style="color: #777;">If you did not request this, please ignore this email. Never share your OTP with anyone.</p>
  </div>
`;
