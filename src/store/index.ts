"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    task: todoReducer,
    theme: themeReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
