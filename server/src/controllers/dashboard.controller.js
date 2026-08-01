import ApiResponse from "../utils/ApiResponse.js";
import * as dashboardService from "../services/dashboard.service.js";

export const adminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getAdminDashboard(req.user);
    ApiResponse.success(res, {
      message: "Admin dashboard data.",
      data,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const developerDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getDeveloperDashboard(req.user);
    ApiResponse.success(res, {
      message: "Developer dashboard data.",
      data,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
