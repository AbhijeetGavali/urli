"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../store/api/baseApi";
import authReducer, { rehydrateTokens } from "../store/slices/authSlice";
import uiReducer from "../store/slices/uiSlice";

function makeStore() {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

  // Rehydrate tokens synchronously - runs only on the client (this file is 'use client')
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    store.dispatch(rehydrateTokens({ accessToken, refreshToken }));
  }

  return store;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
