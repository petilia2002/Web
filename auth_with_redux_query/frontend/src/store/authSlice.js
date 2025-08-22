import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
    isAuthChecking: true,
  },
  extraReducers: (builder) => {
    // REGISTRATION
    builder.addMatcher(
      authApi.endpoints.registration.matchFulfilled,
      (state, action) => {}
    );
  },
});

export default authSlice.reducer;
