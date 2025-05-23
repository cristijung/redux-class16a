
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/CounterSlice";
import { catsApi } from "../store/catApi";       
import todosSlice from '../components/todo/todoSlice';
import { postsApi } from './postsApi';

export const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,      
      todos: todosSlice,     
      [catsApi.reducerPath]: catsApi.reducer,  // forma de relacionar referenciar o createApi como reducer     
      [postsApi.reducerPath]: postsApi.reducer,     
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(catsApi.middleware)  
        .concat(postsApi.middleware),  // middleware do RTK Query é usado para gerenciar o fluxo de dados assíncronos em aplicações React que utilizam Redux 
        // para o gerenciamento de estado. Ele simplifica drasticamente a forma como buscamos, arnazenamos em cache, e atualizamos os dados de APIs. 
  });
};


export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

