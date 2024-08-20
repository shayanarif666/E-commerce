import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("authenticated", JSON.parse(action.payload));
        },
        logout: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("authenticated", JSON.parse(action.payload));
        }
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;