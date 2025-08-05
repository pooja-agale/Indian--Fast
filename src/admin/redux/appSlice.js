import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apis/Auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("adminDetails")),
  },
  reducers: {
    logoutReporter: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload}) => {
        
        console.log("verifyOtp payload received:", payload);
        state.user = payload; 
        localStorage.setItem("adminDetails",JSON.stringify(payload))
        localStorage.setItem("token", payload?.token);
      }
    );
  }
});

export const { logoutReporter } = authSlice.actions;
export default authSlice.reducer;
