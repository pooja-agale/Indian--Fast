import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DeliveryPartnerapi = createApi({
  reducerPath: "DeliveryPartnerapi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllDeliveryPartner: builder.query({
      query: () => "/delivery/auth/getall",
      providesTags: ['DeliveryPartner'],
    }),
    deleteDeliveryPartner: builder.mutation({
      query: (id) => ({
        url: `/delivery/auth/delete/${id}`, // ✅ FIXED
        method: "DELETE",
        invalidateTags: ['DeliveryPartner'],
      }),
    }),
    updateDeliveryPartnerStatus: builder.mutation({
      query: ({id, status}) => ({
        url: `/delivery/auth/update-status/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

// ✅ Export hook like this
export const {
  useGetAllDeliveryPartnerQuery,
  useDeleteDeliveryPartnerMutation,
  useUpdateDeliveryPartnerStatusMutation,
} = DeliveryPartnerapi;
