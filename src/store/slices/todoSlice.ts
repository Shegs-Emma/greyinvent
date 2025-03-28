"use client";

import { createSlice } from "@reduxjs/toolkit";
import { TodosInterface } from "@/components/utils/interface";
import { createTodo, fetchAllTodos } from "../actions/todoActions";

interface StateProps {
  tasks: TodosInterface[];
  createTodo: TodosInterface;
}

const initialState: StateProps = {
  tasks: [],
  createTodo: {
    id: 0,
    title: "",
    completed: false,
    userId: 0,
  },
};

const TodoSlice = createSlice({
  name: "TodoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.fulfilled, (state, { payload }) => {
      state.tasks = payload;
    });

    builder.addCase(createTodo.fulfilled, (state, { payload }) => {
      state.createTodo = payload;
    });
  },
});

const { reducer } = TodoSlice;

export default reducer;
