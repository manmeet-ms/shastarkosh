
import api from "./api.js";

export async function getResourceMaterialSrv(limit) {
  return await api.get(`/resources?limit=${limit}`);
}
export async function getSingleResourceMaterialSrv(rId) {
  return await api.get(`/resources/r/${rId}`);
}
export async function createResourceMaterialSrv(data) {
  console.log("log",data)
  return await api.post("/resources/create", data);
}
export async function updateResourceMaterialSrv(rId, data) {
  return await api.put(`/resources/update/${rId}`,data);
}
export async function deleteResourceMaterialSrv(rId) {
  return await api.delete(`/resources/delete/${rId}`);
}
