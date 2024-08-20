import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const oldState = JSON.parse(localStorage.getItem('Cart Data')) || [];
            const newState = [...oldState, action.payload];
            state.value = newState;
            localStorage.setItem('Cart Data', JSON.stringify(state.value));
        },
        removeFromCart: (state, action) => {
            const oldState = JSON.parse(localStorage.getItem("Cart Data")) || [];
            state.value = oldState.filter((product) => {
                return product.id != action.payload;
            })
            localStorage.setItem("Cart Data", JSON.stringify(state.value));
        },
        changeQuantity: (state, action) => {
            const oldState = JSON.parse(localStorage.getItem("Cart Data")) || [];
            state.value = oldState.map((product) => {
                return action.payload.id === product.id ? { ...product, quantity: action.payload.quantity } : product;
            })
            localStorage.setItem("Cart Data", JSON.stringify(state.value));
        },
    },
})

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;