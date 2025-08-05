import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Categoriesapi = createApi({
  reducerPath: "Categoriesapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, // No auth token
    prepareHeaders: (headers) => {
      // headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/vendor/categories/getall",
      method: "GET",
    }),
    addCategories: builder.mutation({
      query: (newCategory) => ({
        url: "/vendor/categories/addcategories",
        method: "POST",
        body: newCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/vendor/categories/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/vendor/categories/update/${id}`, 
        method: "PUT", 
        body: updatedData,
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoriesMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = Categoriesapi;
