import api from "./api.js";

export const postCommentSrv = async (postId, data) => {
  console.log(postId, data);

  return await api.post(`/comments/${postId}`, data, { withCredentials: true });
};

export const getCommentsOnSinglePostSrv = async (postId) => {
  console.log(postId);

  return await api.get(`/comments/count/${postId}`);
};
