import { createSlice } from "@reduxjs/toolkit";

const todosInitialState = {
  todos: [],
  showedTodos: [],
  sortId: "asc",
  sortTitle: "asc",
  pagination: 0,
  searchFilter: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState: todosInitialState,
  reducers: {
    setTodos: (state, action) => {
      const showedTodos = action.payload.slice(0, 10);
      return { ...state, todos: action.payload, showedTodos };
    },
    setSortId: (state, action) => {
      let sortId = action.payload;
      if (sortId === "asc") {
        const showedTodos = [...state.showedTodos].sort((a, b) => {
          return a.id < b.id ? 1 : -1;
        });
        return { ...state, sortId: "desc", showedTodos };
      }
      const showedTodos = [...state.showedTodos].sort((a, b) => {
        return a.id < b.id ? -1 : 1;
      });
      return { ...state, sortId: "asc", showedTodos };
    },
    setSortTitle: (state, action) => {
      let sortTitle = action.payload;
      if (sortTitle === "asc") {
        const showedTodos = [...state.showedTodos].sort((a, b) => {
          return a.title < b.title ? 1 : -1;
        });
        return { ...state, sortTitle: "desc", showedTodos };
      }
      const showedTodos = [...state.showedTodos].sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
      return { ...state, sortTitle: "asc", showedTodos };
    },

    setPagination: (state, action) => {
      const startIndex = 10 * action.payload;
      const endIndex = 10 * (action.payload + 1);
      const showedTodos = state.todos.slice(startIndex, endIndex);
      return { ...state, pagination: action.payload, showedTodos };
    },

    setSearchFilter: (state, action) => {
      return { ...state, searchFilter: action.payload };
    },
  },
});

export const {
  setTodos,
  setSortId,
  setSortTitle,
  setPagination,
  setSearchFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
