import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if(token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // 1️⃣ Send OTP to email
    loginWithEmail: builder.mutation({
      query: (email) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: { email },
      }),
    }),

    // 2️⃣ Verify OTP and login
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/admin/auth/verify-otp",
        method: "POST",
        body: {
          otp, 
          email,
          isLogin: "true",
        },
      }),
    }),
  }),
});

export const {
  useLoginWithEmailMutation,
  useVerifyOtpMutation,
} = authApi;
