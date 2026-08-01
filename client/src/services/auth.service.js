import axiosInstance from "./axios";

export const loginDeveloper = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/developer/login", {
    email,
    password,
  });

  return response.data.data;
};

export const registerDeveloper = async ({
  fullName,
  email,
  password,
  confirmPassword,
}) => {
  const response = await axiosInstance.post("/auth/developer/register", {
    fullName,
    email,
    password,
    confirmPassword,
  });

  return response.data.data;
};
