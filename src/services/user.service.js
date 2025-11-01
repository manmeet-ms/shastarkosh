import api from "./api.js";

// TODO: fix this
export const  getUserSrv =async (data) => await api.get(`/users/u/${data}`, { withCredentials: true });
export const  updateUserSrv =async (data) => await api.put(`/users/update/`, data, { withCredentials: true });
export const  getUserContentSrv =async (data) => await api.get(`/users/u/${data}/content`, { withCredentials: true });
// TODO create &  delete, users
export const  flushUsers =async () => await api.post("/users/flush");
