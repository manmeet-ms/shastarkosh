import api from "./api.js";

// TODO: fix this
export const getUserSrv = (userId) => api.get(`/users/${userId}`, { withCredentials: true });
export const updateUserSrv = (data) => api.put(`/users/update/`, data, { withCredentials: true });

// TODO create &  delete, users
export const flushUsers = () => api.post("/users/flush");
