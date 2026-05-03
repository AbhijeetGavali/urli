import { api } from './baseApi'

export const analyticsApi = api.injectEndpoints({
  endpoints: (b) => ({
    getOverview: b.query<any, void>({
      query: () => '/analytics/overview',
      providesTags: ['Analytics'],
    }),
    getLinkStats: b.query<any, string>({
      query: (linkId) => `/analytics/${linkId}`,
      providesTags: ['Analytics'],
    }),
    getLinkClicks: b.query<any, { linkId: string; page?: number }>({
      query: ({ linkId, page = 1 }) => `/analytics/${linkId}/clicks?page=${page}`,
    }),
  }),
})

export const subscriptionApi = api.injectEndpoints({
  endpoints: (b) => ({
    getPlans: b.query<any, void>({ query: () => '/subscriptions/plans' }),
    getStatus: b.query<any, void>({
      query: () => '/subscriptions/status',
      providesTags: ['Subscription'],
    }),
    createSubscription: b.mutation<any, { plan: string }>({
      query: (body) => ({ url: '/subscriptions/create', method: 'POST', body }),
    }),
    verifyPayment: b.mutation<any, any>({
      query: (body) => ({ url: '/subscriptions/verify', method: 'POST', body }),
      invalidatesTags: ['Subscription'],
    }),
    cancelSubscription: b.mutation<any, void>({
      query: () => ({ url: '/subscriptions/cancel', method: 'POST' }),
      invalidatesTags: ['Subscription'],
    }),
  }),
})

export const utmApi = api.injectEndpoints({
  endpoints: (b) => ({
    getUTMTemplates: b.query<any, void>({ query: () => '/utm-templates', providesTags: ['UTM'] }),
    createUTMTemplate: b.mutation<any, any>({
      query: (body) => ({ url: '/utm-templates', method: 'POST', body }),
      invalidatesTags: ['UTM'],
    }),
    deleteUTMTemplate: b.mutation<any, string>({
      query: (id) => ({ url: `/utm-templates/${id}`, method: 'DELETE' }),
      invalidatesTags: ['UTM'],
    }),
  }),
})

export const pixelApi = api.injectEndpoints({
  endpoints: (b) => ({
    getPixels: b.query<any, void>({ query: () => '/pixels', providesTags: ['Pixel'] }),
    createPixel: b.mutation<any, any>({
      query: (body) => ({ url: '/pixels', method: 'POST', body }),
      invalidatesTags: ['Pixel'],
    }),
    deletePixel: b.mutation<any, string>({
      query: (id) => ({ url: `/pixels/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Pixel'],
    }),
    verifyPixel: b.query<any, string>({
      query: (id) => `/pixels/${id}/verify`,
    }),
  }),
})

export const workspaceApi = api.injectEndpoints({
  endpoints: (b) => ({
    getWorkspaces: b.query<any, void>({ query: () => '/workspaces', providesTags: ['Workspace'] }),
    createWorkspace: b.mutation<any, { name: string }>({
      query: (body) => ({ url: '/workspaces', method: 'POST', body }),
      invalidatesTags: ['Workspace'],
    }),
    addMember: b.mutation<any, { workspaceId: string; userId: string; role: string }>({
      query: ({ workspaceId, ...body }) => ({ url: `/workspaces/${workspaceId}/members`, method: 'POST', body }),
      invalidatesTags: ['Workspace'],
    }),
    removeMember: b.mutation<any, { workspaceId: string; userId: string }>({
      query: ({ workspaceId, userId }) => ({ url: `/workspaces/${workspaceId}/members/${userId}`, method: 'DELETE' }),
      invalidatesTags: ['Workspace'],
    }),
  }),
})

export const bioApi = api.injectEndpoints({
  endpoints: (b) => ({
    getBio: b.query<any, void>({ query: () => '/bio', providesTags: ['Bio'] }),
    upsertBio: b.mutation<any, any>({
      query: (body) => ({ url: '/bio', method: 'PUT', body }),
      invalidatesTags: ['Bio'],
    }),
    checkBioSlug: b.query<any, string>({
      query: (slug) => `/bio/check-slug/${slug}`,
    }),
    submitFeatureRequest: b.mutation<any, any>({
      query: (body) => ({ url: '/feature-requests', method: 'POST', body }),
    }),
  }),
})

export const apiKeyApi = api.injectEndpoints({
  endpoints: (b) => ({
    getApiKeys: b.query<any, void>({ query: () => '/api-keys', providesTags: ['ApiKey'] }),
    createApiKey: b.mutation<any, { name: string }>({
      query: (body) => ({ url: '/api-keys', method: 'POST', body }),
      invalidatesTags: ['ApiKey'],
    }),
    deleteApiKey: b.mutation<any, string>({
      query: (id) => ({ url: `/api-keys/${id}`, method: 'DELETE' }),
      invalidatesTags: ['ApiKey'],
    }),
  }),
})

export const {
  useGetOverviewQuery, useGetLinkStatsQuery, useGetLinkClicksQuery,
} = analyticsApi
export const {
  useGetPlansQuery, useGetStatusQuery, useCreateSubscriptionMutation,
  useVerifyPaymentMutation, useCancelSubscriptionMutation,
} = subscriptionApi
export const { useGetUTMTemplatesQuery, useCreateUTMTemplateMutation, useDeleteUTMTemplateMutation } = utmApi
export const { useGetPixelsQuery, useCreatePixelMutation, useDeletePixelMutation, useLazyVerifyPixelQuery } = pixelApi
export const { useGetWorkspacesQuery, useCreateWorkspaceMutation, useAddMemberMutation, useRemoveMemberMutation } = workspaceApi
export const { useGetBioQuery, useUpsertBioMutation, useLazyCheckBioSlugQuery, useSubmitFeatureRequestMutation } = bioApi
export const { useGetApiKeysQuery, useCreateApiKeyMutation, useDeleteApiKeyMutation } = apiKeyApi
