// src/redux/store.js (Ví dụ)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice'; // Import productReducer
import categoryReducer from './slices/categorySlice'; // Import categoryReducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,    // Đăng ký product reducer
    categories: categoryReducer, // Đăng ký category reducer
  },
});