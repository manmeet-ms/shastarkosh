import api from "./api";

export async function getForumPostSrv(limit) {
  return await api.get(`/posts?limit=${limit}`);
}
export async function getSingleForumPostSrv(pId) {
  return await api.get(`/posts/${pId}`);
}
export async function createForumPostSrv() {
  return await api.post("/posts/create");
}
export async function updateForumPostSrv(pId) {
  return await api.put(`/posts/update/${pId}`);
}
export async function deleteForumPostSrv(pId) {
  return await api.delete(`/posts/delete/${pId}`);
}
