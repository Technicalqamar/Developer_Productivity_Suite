import axiosInstance from "../axios/axios";

const buildQuery = (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
};

export const listTools = async (params = {}) => {
  const query = buildQuery(params);
  const response = await axiosInstance.get(`/admin/tools${query ? `?${query}` : ""}`);
  return response.data.data;
};

export const getTool = async (id) => {
  const response = await axiosInstance.get(`/admin/tools/${id}`);
  return response.data.data;
};

export const createTool = async (data) => {
  const response = await axiosInstance.post("/admin/tools", data);
  return response.data.data;
};

export const updateTool = async (id, data) => {
  const response = await axiosInstance.put(`/admin/tools/${id}`, data);
  return response.data.data;
};

export const deleteTool = async (id) => {
  const response = await axiosInstance.delete(`/admin/tools/${id}`);
  return response.data.data;
};

export const updateToolStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/admin/tools/${id}/status`, {
    status,
  });
  return response.data.data;
};

export const publishTool = async (id) => {
  const response = await axiosInstance.post(`/admin/tools/${id}/publish`);
  return response.data.data;
};

export const unpublishTool = async (id) => {
  const response = await axiosInstance.post(`/admin/tools/${id}/unpublish`);
  return response.data.data;
};

export const deprecateTool = async (id) => {
  const response = await axiosInstance.post(`/admin/tools/${id}/deprecate`);
  return response.data.data;
};

export const restoreTool = async (id) => {
  const response = await axiosInstance.post(`/admin/tools/${id}/restore`);
  return response.data.data;
};

export const updateToolVisibility = async (id, developerVisible) => {
  const response = await axiosInstance.patch(`/admin/tools/${id}/visibility`, {
    developerVisible,
  });
  return response.data.data;
};
