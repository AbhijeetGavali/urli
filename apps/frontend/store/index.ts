import { configureStore } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import { showToast } from "./slices/uiSlice";
import { extractError } from "../lib/extractError";

// Endpoints that handle their own errors - skip auto-toast for these
const SILENT_ENDPOINTS = new Set([
  "login",
  "register",
  "forgotPassword",
  "resetPassword",
  "createLink",
  "updateLink",
  "deleteLink",
  "createSubscription",
  "verifyPayment",
  "createApiKey",
  "deleteApiKey",
  "createPixel",
  "deletePixel",
  "createUTMTemplate",
  "deleteUTMTemplate",
  "upsertBio",
  "createWorkspace",
  "removeMember",
  "cancelSubscription",
]);

const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const endpointName = (action.meta?.arg as any)?.endpointName ?? "";
    if (!SILENT_ENDPOINTS.has(endpointName)) {
      store.dispatch(
        showToast({ message: extractError(action.payload), type: "error" }),
      );
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
