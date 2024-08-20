import { configureStore } from '@reduxjs/toolkit';
import cartReducers from "./cartSlices";
import wishlistReducers from "./wishlistSlices";
import orderReducers from "./orderSlices";
import authReducers from "./authSlices";

export const store = configureStore({
    reducer: {
        cart: cartReducers,
        wishlist: wishlistReducers,
        order: orderReducers,
        auth: authReducers
    },
})