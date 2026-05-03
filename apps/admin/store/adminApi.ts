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
  tagTypes: ['Users', 'Stats', 'FeatureRequests', 'BioTemplates'],
  endpoints: (b) => ({
    getStats: b.query<any, void>({
      query: () => '/admin/stats',
      providesTags: ['Stats'],
    }),
    getUsers: b.query<any, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({ url: '/admin/users', params }),
      providesTags: ['Users'],
    }),
    updateUser: b.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/admin/users/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Users'],
    }),
    suspendUser: b.mutation<any, { id: string; suspended: boolean }>({
      query: ({ id, suspended }) => ({ url: `/admin/users/${id}/suspend`, method: 'POST', body: { suspended } }),
      invalidatesTags: ['Users'],
    }),
    // Feature requests
    getFeatureRequests: b.query<any, { status?: string; category?: string; page?: number }>({
      query: (params) => ({ url: '/admin/feature-requests', params }),
      providesTags: ['FeatureRequests'],
    }),
    updateFeatureRequest: b.mutation<any, { id: string; status?: string; adminNote?: string }>({
      query: ({ id, ...data }) => ({ url: `/admin/feature-requests/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['FeatureRequests'],
    }),
    // Bio templates
    getBioTemplates: b.query<any, { profession?: string }>({
      query: (params) => ({ url: '/admin/bio-templates', params }),
      providesTags: ['BioTemplates'],
    }),
    createBioTemplate: b.mutation<any, any>({
      query: (body) => ({ url: '/admin/bio-templates', method: 'POST', body }),
      invalidatesTags: ['BioTemplates'],
    }),
    updateBioTemplate: b.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/admin/bio-templates/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['BioTemplates'],
    }),
    deleteBioTemplate: b.mutation<any, string>({
      query: (id) => ({ url: `/admin/bio-templates/${id}`, method: 'DELETE' }),
      invalidatesTags: ['BioTemplates'],
    }),
  }),
})

export const {
  useGetStatsQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useSuspendUserMutation,
  useGetFeatureRequestsQuery,
  useUpdateFeatureRequestMutation,
  useGetBioTemplatesQuery,
  useCreateBioTemplateMutation,
  useUpdateBioTemplateMutation,
  useDeleteBioTemplateMutation,
} = adminApi
