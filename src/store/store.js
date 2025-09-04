import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import pointsSlice from "./pointsSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    points: pointsSlice,
  },
});
export default store;
