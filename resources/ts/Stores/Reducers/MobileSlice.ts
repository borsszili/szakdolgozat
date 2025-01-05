import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialState {
    isMobile: boolean,
}

const initialState: InitialState = {
    isMobile: false,
}

const mobileSlice = createSlice({
    name: 'mobile',
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
    },
});


export const { setIsMobile } = mobileSlice.actions;

export const getIsMobile = (state) => state.mobile.isMobile;
export default mobileSlice.reducer;
