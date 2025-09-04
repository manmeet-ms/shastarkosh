// store/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Make sure axios sends cookies
axios.defaults.withCredentials = true;

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true });
  // console.log("fetchUser() :: authSlice :: res.data", res.data);
  return res.data; // user object from backend
});

const initialState = {
  user: null,
  status: false,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload.userData;
    },
    logoutSuccess: (state) => {
      state.status = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
