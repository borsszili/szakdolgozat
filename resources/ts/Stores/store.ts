import { configureStore} from '@reduxjs/toolkit'
import mobileReducer from "./Reducers/MobileSlice";
import authReducer from "./Reducers/AuthSlice";
import userReducer from "./Reducers/UserSlice";

export const store = configureStore({
    reducer: {
        mobile: mobileReducer,
        auth: authReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

