import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // use /react for hooks

export const Bannerapi = createApi({
  reducerPath: "Bannerapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => "/shop/gallery/all",
    }),
    addBanner: builder.mutation({
      query: (formData) => ({
        url: "/shop/gallery/add",
        method: "POST",
        body: formData,
      }),
    }),
    deleteBanner: builder.mutation({
        query: (id) => ({
          url: `/shop/gallery/delete/${id}`,
          method: 'DELETE',
        }),
      }),
  }),
});

export const { useGetAllBannerQuery, useAddBannerMutation, useDeleteBannerMutation } = Bannerapi;
