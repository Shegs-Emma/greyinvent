"use client";

import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  darkMode: boolean;
};

const initialState: ThemeState = {
  darkMode:
    typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
    },
  },
});

const { reducer, actions } = themeSlice;

export const { toggleTheme } = actions;

export default reducer;
