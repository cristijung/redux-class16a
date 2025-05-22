import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../components/counter/CounterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,        
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;