import ApiResponse from "../utils/ApiResponse.js";

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(res, { message: "Access denied.", statusCode: 403 });
    }

    next();
  };
};

export default authorize;
