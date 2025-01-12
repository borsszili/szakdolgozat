import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.token;
export default userSlice.reducer;
