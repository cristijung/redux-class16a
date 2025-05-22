import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Todo, TodosState } from "@/app/types/interfacess";

const initialState: TodosState = {
  items: [
    { id: nanoid(), text: "Tomar Café", completed: true },
    { id: nanoid(), text: "Estudar Redux", completed: false },
  ],
};

// usando o 'combine.redux' implícito --> últimas vs do RTK
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      },
      prepare: (text: string) => {
        // prepare permite formatar o payload
        const id = nanoid();
        return { payload: { id, text, completed: false } };
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export const selectAllTodos = (state: { todos: TodosState}) => state.todos.items;
export default todoSlice.reducer;