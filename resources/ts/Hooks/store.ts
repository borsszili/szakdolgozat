import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    isMobile: boolean
}

const initialState: AppState = {
    isMobile: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
    },
})

export const { setIsMobile } = appSlice.actions

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

