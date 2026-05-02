import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Users', 'Stats'],
  endpoints: (b) => ({
    getStats: b.query<any, void>({ query: () => '/admin/stats', providesTags: ['Stats'] }),
    getUsers: b.query<any, { page?: number; limit?: number }>({
      query: (params) => ({ url: '/admin/users', params }),
      providesTags: ['Users'],
    }),
    updateUser: b.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/admin/users/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetStatsQuery, useGetUsersQuery, useUpdateUserMutation } = adminApi
