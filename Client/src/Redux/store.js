import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import popupReducer from "./popupSlice.js";
import cartReducer from "./cartSlice.js";
import productReducer from "./productSlice.js";
import orderReducer from "./orderSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        cart: cartReducer,
        product: productReducer,
        order: orderReducer,
    },
});