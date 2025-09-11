import api from "./api.js";

export const registerUserSrv = async (data) => await api.post("/auth/register", data);

export const loginUserSrv = async (data) => await api.post("/auth/login", data);
export const verifyUserSrv = async (token) => await api.get(`/auth/verify/${token}`);
export const resetPasswordSrv = async (data) => await api.post(`/auth/reset-password`, data, { withCredentials: true });

export const logoutUserSrv = async (data) => await api.post("/auth/logout", data, { withCredentials: true });
