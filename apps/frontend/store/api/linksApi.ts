import { api } from './baseApi'

export const linksApi = api.injectEndpoints({
  endpoints: (b) => ({
    getLinks: b.query<any, { page?: number; limit?: number; search?: string; workspaceId?: string }>({
      query: (params) => ({ url: '/links', params }),
      providesTags: ['Link'],
    }),
    getLink: b.query<any, string>({
      query: (id) => `/links/${id}`,
      providesTags: ['Link'],
    }),
    createLink: b.mutation<any, any>({
      query: (body) => ({ url: '/links', method: 'POST', body }),
      invalidatesTags: ['Link', 'Analytics'],
    }),
    updateLink: b.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/links/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Link'],
    }),
    deleteLink: b.mutation<any, string>({
      query: (id) => ({ url: `/links/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Link', 'Analytics'],
    }),
    getQR: b.query<any, { linkId: string; format?: string }>({
      query: ({ linkId, format = 'png' }) => `/qr/${linkId}?format=${format}`,
    }),
  }),
})

export const {
  useGetLinksQuery, useGetLinkQuery, useCreateLinkMutation,
  useUpdateLinkMutation, useDeleteLinkMutation, useGetQRQuery,
} = linksApi
