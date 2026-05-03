import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import type { RootState } from "../index";
import { setCredentials, clearAuth } from "../slices/authSlice";

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        if (!refreshToken) {
          api.dispatch(clearAuth());
          return result;
        }

        const refreshResult = await rawBaseQuery(
          { url: "/auth/refresh", method: "POST", body: { refreshToken } },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const {
            accessToken,
            refreshToken: newRefresh,
            user,
          } = refreshResult.data as any;
          api.dispatch(
            setCredentials({ user, accessToken, refreshToken: newRefresh }),
          );
          // Retry original request with new token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearAuth());
        }
      } finally {
        release();
      }
    } else {
      // Another request is already refreshing - wait and retry
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Link",
    "Analytics",
    "UTM",
    "Pixel",
    "Workspace",
    "ApiKey",
    "Bio",
    "Subscription",
  ],
  endpoints: () => ({}),
});
