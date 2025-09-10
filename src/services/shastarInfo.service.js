
import api from "./api.js";

export async function getShastarSrv(limit) {
  return await api.get(`/shastars?limit=${limit}`);
}
export async function getSingleShastarSrv(sId) {
  return await api.get(`/shastars/s/${sId}`);
}
export async function createShastarSrv(data) {
  console.log("log",data)
  return await api.post("/shastars/create", data);
}
export async function updateShastarSrv(sId, data) {
  return await api.put(`/shastars/update/${sId}`,data);
}
export async function deleteShastarSrv(sId) {
  return await api.delete(`/shastars/delete/${sId}`);
}
