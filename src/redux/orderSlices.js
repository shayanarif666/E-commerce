import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        placeOrder: (state, action) => {
            const oldOrders = JSON.parse(localStorage.getItem("Order")) || [];
            const newOrder = [...oldOrders, action.payload];
            state.value = newOrder;
            localStorage.setItem("Order", JSON.stringify(state.value));
        },
        updateOrderStatus: (state, action) => {
            console.log("order", action);
            const oldOrders = JSON.parse(localStorage.getItem("Order"));
            state.value = oldOrders.map((order) => {
                return order.id === action.payload.id ? { ...order, orderStatus: action.payload.updatedStatus } : order;
            });
            localStorage.setItem("Order", JSON.stringify(state.value));
        },
        updatePaymentStatus: (state, action) => {
            const oldOrders = JSON.parse(localStorage.getItem("Order"));
            state.value = oldOrders.map((order) => {
                return order.id === action.payload.id ? { ...order, paymentStatus: action.payload.updatedStatus } : order;
            });
            localStorage.setItem("Order", JSON.stringify(state.value));
        }
    },
})

export const { placeOrder, updateOrderStatus, updatePaymentStatus } = orderSlice.actions;

export default orderSlice.reducer;