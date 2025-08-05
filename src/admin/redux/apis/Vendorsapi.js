import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { build } from 'vite';

export const Vendorsapi = createApi({
  reducerPath: 'vendorsapi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllVendorsShops: builder.query({
      query: () => ({
        url: '/vendor/auth/allshops',
        method: 'GET', 
      }),
    }),
    getVendorsDetails: builder.query({
        query: (id) => ({
            url: `/vendor/auth/get/${id}`,
            method: 'GET',
        })
    }),
    deleteVendorsShops: builder.mutation({
      query: (id) => ({
        url: `/vendor/auth/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    // getShopsByStatus: builder.query({
    //   query: (status) => ({
    //     url: `/vendor/auth/status/${status}`,
    //     method: 'GET',
    //   })
    // }),
    updateVendorStatus: builder.mutation({
      query: ({id, status}) => ({
        url: `/vendor/auth/statusAppRej/${id}`,
        method: 'PUT',
        body: {status},
      })
    })
  }),
});

export const {
  useGetAllVendorsShopsQuery,
  useGetVendorsDetailsQuery,
  useDeleteVendorsShopsMutation,
  useGetShopsByStatusQuery,
  useUpdateVendorStatusMutation
} = Vendorsapi;
