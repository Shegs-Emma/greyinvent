"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../slices/appSlice";
import { handleError } from "../slices/errorSlice";
import {
  CreateTodoInterface,
  TodosInterface,
} from "@/components/utils/interface";
import TodosService from "@/api/todos";

export const fetchAllTodos = createAsyncThunk<TodosInterface[]>(
  "get/fetchTodos",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(startLoad());

    try {
      const res = await TodosService.fetchTodos();
      return res.data;
    } catch (err) {
      handleError(err, dispatch);
      return rejectWithValue("Failed to fetch todos");
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const createTodo = createAsyncThunk(
  "post/createTodo",
  async (data: CreateTodoInterface, { dispatch, rejectWithValue }) => {
    dispatch(startLoad());

    try {
      const res = await TodosService.createTodo(data);
      return res.data;
    } catch (err) {
      handleError(err, dispatch);
      return rejectWithValue("Failed to create todo");
    } finally {
      dispatch(stopLoad());
    }
  }
);
