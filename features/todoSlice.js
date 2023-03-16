import { createSlice } from "@reduxjs/toolkit";

const todosInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: todosInitialState,
  reducers: {
    setTodos: (state, action) => {
      return { ...state, todos: action.payload };
    },
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
