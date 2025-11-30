import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import categoriesReducer from './categoriesSlice'
import productReducer from './productSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        categories: categoriesReducer,
        product: productReducer,
        auth: authReducer,
    }
})