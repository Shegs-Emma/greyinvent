"use client";

import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeHandler() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return null;
}
