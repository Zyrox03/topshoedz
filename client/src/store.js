// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./toolkit/cartSlice";
import productsReducer from "./toolkit/productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    // Add other reducers for different features here
  },
});

export default store;
