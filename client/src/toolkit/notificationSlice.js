// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: null,
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
