import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.value = [...state.value, action.payload];
        },
        removeFromWishlist: (state, action) => {
            state.value = state.value.filter((product) => {
                return product.id != action.payload;
            })
        }
    },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer