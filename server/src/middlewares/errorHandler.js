import AppError from "../utils/AppError.js";

const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  if (err.name === "CastError") {
    error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new AppError(`Duplicate value for field: ${field}`, 409);
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new AppError("Validation failed", 400);
    error.errors = messages;
  }

  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const errors = error.errors || [];

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
  });
};

export default errorHandler;
