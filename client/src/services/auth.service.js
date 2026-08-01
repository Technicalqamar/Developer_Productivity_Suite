import axiosInstance from "./axios";

export const loginDeveloper = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/developer/login", {
    email,
    password,
  });

  return response.data.data;
};
