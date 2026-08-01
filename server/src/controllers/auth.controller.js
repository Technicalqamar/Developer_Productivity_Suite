import ApiResponse from "../utils/ApiResponse.js";
import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    ApiResponse.success(res, {
      message: "Account created successfully.",
      data: user,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const registerDeveloper = async (req, res, next) => {
  try {
    const user = await authService.registerDeveloper(req.body);
    ApiResponse.success(res, {
      message: "Developer account created successfully.",
      data: user,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const loginDeveloper = async (req, res, next) => {
  try {
    const data = await authService.loginDeveloper(req.body);
    ApiResponse.success(res, {
      message: "Login successful.",
      data,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const data = await authService.loginAdmin(req.body);
    ApiResponse.success(res, {
      message: "Admin login successful.",
      data,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body);
    ApiResponse.success(res, { message: "OTP sent successfully.", statusCode: 200 });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    await authService.verifyOtp(req.body);
    ApiResponse.success(res, { message: "OTP verified successfully.", statusCode: 200 });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body);
    ApiResponse.success(res, { message: "Password reset successful.", statusCode: 200 });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res) => {
  ApiResponse.error(res, { message: "Not Implemented", statusCode: 501 });
};

export const logout = (req, res) => {
  ApiResponse.error(res, { message: "Not Implemented", statusCode: 501 });
};

export const getCurrentUser = (req, res) => {
  ApiResponse.error(res, { message: "Not Implemented", statusCode: 501 });
};
