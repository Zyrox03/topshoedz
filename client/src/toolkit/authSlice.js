// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logoutAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { setAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
