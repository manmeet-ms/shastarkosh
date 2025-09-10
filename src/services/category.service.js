import api from "./api.js";

export const getCategoriesSrv =async () => {
  return await api.get("/category/");
};
export const getSingleCategorySrv =async () => {
  return await api.get(`/category/c/${cId}`);
};
export const createCategorySrv =async (data) => {
  return await api.post("/category/create", data);
};
export const updateCategpySrv =async () => {
  return await api.post(`/category/update/${cId}`);
};
export const delCategorySrv =async () => {
  return await api.post(`/category/delete/${cId}`);
};
export const flushCategoriesSrv =async () => {
  return await api.post("/category/flush");
};
