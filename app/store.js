import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "@/features/todoSlice";
import todosReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    // todo: todoReducer,
    todos: todosReducer,
  },
});
