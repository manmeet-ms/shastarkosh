import api from "./api";

export const getForumPostSrv = async (limit) => await api.get(`/posts?limit=${limit}`);
export const getSingleForumPostSrv = async (pId) => await api.get(`/posts/p/${pId}`);
export const createForumPostSrv = async (data) => await api.post("/posts/create", data);
export const updateForumPostSrv = async (pId) => await api.put(`/posts/update/${pId}`);
export const deleteForumPostSrv = async (pId) => await api.delete(`/posts/delete/${pId}`);

export const upvotePostSrv = async (postId) => await api.post(`/posts/upvote/${postId}`);
export const downvotePostSrv = async (postId) => await api.post(`/posts/downvote/${postId}`);
