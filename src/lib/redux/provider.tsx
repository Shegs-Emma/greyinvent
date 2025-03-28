"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import ThemeHandler from "@/components/ThemeHandler";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeHandler />
      {children}
    </Provider>
  );
}
