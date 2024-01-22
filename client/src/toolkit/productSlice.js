// src/features/products/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import productsList from '../assets/productList';
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsList, // You can fetch products from an API and store them here
  },
  reducers: {
    // Additional actions for handling products can be defined here
  },
});

// Export any additional actions if needed
export default productsSlice.reducer;
