import api from "./api.js";

export const getShastarSrv = async (limit) => await api.get(`/shastars?limit=${limit}`);
export const getSingleShastarSrv = async (sId) => await api.get(`/shastars/s/${sId}`);
export const createShastarSrv = async (data) => await api.post("/shastars/create", data);
export const updateShastarSrv = async (sId, data) => await api.put(`/shastars/update/${sId}`, data);
export const deleteShastarSrv = async (sId) => await api.delete(`/shastars/delete/${sId}`);

export const likeShastarSrv = async (sId) => await api.post(`/shastars/like/${sId}`);

// export async function downvotePostSrv(postId) {
//   return await api.post(`/resources/downvote/${postId}`);
// }
