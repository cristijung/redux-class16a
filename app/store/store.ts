import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../components/counter/CounterSlice';
import todoSlice from '../components/todo/todoSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todoSlice,        
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;