import ApiResponse from "../utils/ApiResponse.js";

export const developerAccess = (req, res) => {
  ApiResponse.success(res, { message: "Developer access granted." });
};

export const adminAccess = (req, res) => {
  ApiResponse.success(res, { message: "Admin access granted." });
};

export const profile = (req, res) => {
  ApiResponse.success(res, {
    message: "Profile retrieved successfully.",
    data: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
    },
  });
};
