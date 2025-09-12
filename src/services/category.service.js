import api from "./api.js";

export const getCategoriesSrv =async () => await api.get("/category/");
export const getSingleCategorySrv =async () => await api.get(`/category/c/${cId}`);
export const createCategorySrv =async (data) => await api.post("/category/create", data);
export const updateCategpySrv =async () => await api.post(`/category/update/${cId}`);
export const delCategorySrv =async () => await api.post(`/category/delete/${cId}`);
export const flushCategoriesSrv =async () => await api.post("/category/flush");
