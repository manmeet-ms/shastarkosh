import axios from "axios";

import api from "./api.js";

export const registerUser = async (userData) => {
  // Logic for registering a user
};

export const loginUser = async (credentials) => {
  // Logic for logging in a user
};

export const verifyUser = async (token) => {
  // Logic for verifying a user
};

export const resetPassword = async (email) => {
  // Logic for resetting a user's password
};

// TODO: fix this
export const getUserSrv = (id) => axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, { withCredentials: true });
export const updateUserSrv = (data) => api.put(`/users/update`, data, { withCredentials: true });
 

export const flushUsers = () => 
  api.post("/users/flush");
