import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // No auth token
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/user/auth/getall',
      method: 'GET',
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/auth/user/${id}`,
        method: 'DELETE',
      }),
    }),
    getUserById: builder.query({
      query:(id) => ({
       url: `/user/order/shop/${id}`,
       method: 'GET',
      })
    })
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation, useGetUserByIdQuery } = api;
