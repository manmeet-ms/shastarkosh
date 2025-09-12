import api from "./api.js";

export const postCommentSrv => async (postId, data) = await api.post(`/comments/${postId}`, data, { withCredentials: true });
export const getCommentCountSrv => async (postId) =>  await api.get(`/comments/count/${postId}`);
export const getCommentsOnSinglePostSrv =>async (postId) =>  await api.get(`/comments/c/${postId}`);
