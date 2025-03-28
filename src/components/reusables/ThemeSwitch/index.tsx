"use client";

import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ThemeSwitch() {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 rounded-md transition-all cursor-pointer my-4 ${
        darkMode ? "bg-gray-700" : "bg-gray-200 text-[#000000]"
      }`}
    >
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
