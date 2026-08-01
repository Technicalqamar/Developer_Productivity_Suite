import User from "../models/User.js";

const getUserProfile = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
});

export const getAdminDashboard = async (user) => {
  const [totalDevelopers, totalAdmins, totalUsers] = await Promise.all([
    User.countDocuments({ role: "developer" }),
    User.countDocuments({ role: "admin" }),
    User.countDocuments({}),
  ]);

  return {
    profile: getUserProfile(user),
    totalDevelopers,
    totalAdmins,
    totalUsers,
    totalProjects: 0,
    totalGeneratedTemplates: 0,
    recentActivity: [],
    systemStatus: "Healthy",
  };
};

export const getDeveloperDashboard = async (user) => {
  return {
    profile: getUserProfile(user),
    myProjects: [],
    recentActivity: [],
    totalGeneratedTemplates: 0,
    accountStatus: "Active",
  };
};
