import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../API/AuthService";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await AuthService.login(userData);
      console.log(result);
      const { user, access_token } = result.data;
      localStorage.setItem("token", access_token);
      return { user };
    } catch (e) {
      console.log(e);
      // console.log(e.response.data.message);
      return rejectWithValue(e.message);
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await AuthService.registration(userData);
      const { user, access_token } = result.data;
      localStorage.setItem("token", access_token);
      return { user };
    } catch (e) {
      console.log(e);
      // console.log(e.response.data.message);
      return rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await AuthService.logout();
      localStorage.removeItem("token");
      console.log(result.data.message);
      return { message: result.data.message };
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const result = await AuthService.refresh();
      const { user, access_token } = result.data;
      localStorage.setItem("token", access_token);
      console.log(result.data);
      return { user };
    } catch (e) {
      console.log(e);
      // console.log(e.response.data.message);
      return rejectWithValue(e.message);
    }
  }
);

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleAuthSuccess = (state, action) => {
  state.user = action.payload.user;
  state.isAuth = true;
  state.isLoading = false;
};

const handleLogoutSuccess = (state) => {
  state.user = null;
  state.isAuth = false;
  state.isLoading = false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuth: false, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, handlePending);
    builder.addCase(login.fulfilled, handleAuthSuccess);
    builder.addCase(login.rejected, handleRejected);

    builder.addCase(registration.pending, handlePending);
    builder.addCase(registration.fulfilled, handleAuthSuccess);
    builder.addCase(registration.rejected, handleRejected);

    builder.addCase(logout.pending, handlePending);
    builder.addCase(logout.fulfilled, handleLogoutSuccess);
    builder.addCase(logout.rejected, handleRejected);

    builder.addCase(checkAuth.pending, handlePending);
    builder.addCase(checkAuth.fulfilled, handleAuthSuccess);
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
