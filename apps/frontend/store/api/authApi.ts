import { api } from './baseApi'

export const authApi = api.injectEndpoints({
  endpoints: (b) => ({
    register: b.mutation<any, { email: string; name: string; password: string; termsAccepted: boolean }>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    login: b.mutation<any, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    googleAuth: b.mutation<any, { googleId: string; email: string; name: string; avatar?: string }>({
      query: (body) => ({ url: '/auth/google', method: 'POST', body }),
    }),
    refresh: b.mutation<any, { refreshToken: string }>({
      query: (body) => ({ url: '/auth/refresh', method: 'POST', body }),
    }),
    logout: b.mutation<any, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    me: b.query<any, void>({
      query: () => '/auth/me',
    }),
    forgotPassword: b.mutation<any, { email: string }>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),
    resetPassword: b.mutation<any, { token: string; password: string }>({
      query: (body) => ({ url: '/auth/reset-password', method: 'POST', body }),
    }),
    deleteAccount: b.mutation<any, { password?: string }>({
      query: (body) => ({ url: '/auth/delete-account', method: 'DELETE', body }),
    }),
    exportData: b.query<any, void>({
      query: () => '/auth/export-data',
    }),
  }),
})

export const {
  useRegisterMutation, useLoginMutation, useGoogleAuthMutation,
  useRefreshMutation, useLogoutMutation, useMeQuery,
  useForgotPasswordMutation, useResetPasswordMutation,
  useDeleteAccountMutation, useExportDataQuery,
} = authApi
