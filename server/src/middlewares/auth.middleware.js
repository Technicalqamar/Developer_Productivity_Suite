import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return ApiResponse.error(res, { message: "Authentication required.", statusCode: 401 });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return ApiResponse.error(res, { message: "User not found.", statusCode: 401 });
    }

    if (!user.isActive) {
      return ApiResponse.error(res, { message: "Account is inactive.", statusCode: 403 });
    }

    req.user = user;
    next();
  } catch {
    return ApiResponse.error(res, { message: "Invalid or expired token.", statusCode: 401 });
  }
};

export default authMiddleware;
