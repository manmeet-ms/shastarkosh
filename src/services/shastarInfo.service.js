import api from "./api";

export async function getShastarSrv(limit) {
  return await api.get(`/shastars?limit=${limit}`);
}
export async function getSingleShastarSrv(sId) {
  return await api.get(`/shastars/${sId}`);
}
export async function createShastarSrv() {
  return await api.post("/shastars/create");
}
export async function updateShastarSrv(sId) {
  return await api.put(`/shastars/update/${sId}`);
}
export async function deleteShastarSrv(sId) {
  return await api.delete(`/shastars/delete/${sId}`);
}
