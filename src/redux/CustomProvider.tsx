"use client";

import store from "./store";
import { Provider } from "react-redux";

export function CustomProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}