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
      return rejectWithValue(e.response.data.message);
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
      return rejectWithValue(e.response.data.message);
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
      return rejectWithValue(e.response.data.message);
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
      return rejectWithValue(e.response.data.message);
    }
  }
);

const handlePendingAuthorization = (state) => {
  state.isLoaded = false;
  state.error = null;
  console.log("login.pending -> isLoaded:", state.isLoaded);
};

const handlePendingCheck = (state) => {
  state.isAuthChecked = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoaded = true;
  state.error = action.payload;
};

const handleLogoutSuccess = (state) => {
  state.user = null;
  state.isAuth = false;
  state.isLoaded = true;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    isLoaded: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, handlePendingAuthorization);
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoaded = true;
      console.log("login.fulfilled -> isLoaded:", state.isLoaded);
    });
    builder.addCase(login.rejected, handleRejected);

    builder.addCase(registration.pending, handlePendingAuthorization);
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoaded = true;
    });
    builder.addCase(registration.rejected, handleRejected);

    builder.addCase(logout.fulfilled, handleLogoutSuccess);
    builder.addCase(logout.rejected, handleRejected);

    builder.addCase(checkAuth.pending, handlePendingCheck);
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isAuthChecked = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuth = false;
      state.isAuthChecked = true;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
