import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../services/api.js";

export const fetchPoints = createAsyncThunk("points/fetchPoints", async (_, thunkAPI) => {
  const authRes = await api.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true });
  const userRes = await api.get(`${import.meta.env.VITE_BACKEND_URL}/users/${authRes.data.user.id}`, { withCredentials: true });
  return userRes.data.points;
});

// const fetchPoints = async () => {
//   return resPoints;
// };

const pointsSlice = createSlice({
  name: "points",
  initialState: { value: 0 },
  reducers: {
    setPt: (state, action) => {
      state.value = action.payload;
    },
    deltaPt: (state, action) => {
      state.value += action.payload;
    },
    // deductPt: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPoints.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { setPt, deltaPt } = pointsSlice.actions;
export default pointsSlice.reducer;
