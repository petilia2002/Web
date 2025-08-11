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
      const msg = e?.response?.data?.message || "Что-то не так с сервером..";
      console.log(msg);
      return rejectWithValue(msg);
    }
  }
);

const createRequestState = () => ({
  isLoaded: true,
  error: null,
});

const setPending = (state, method) => {
  state[method].isLoaded = false;
  state[method].error = null;
};

const setRejected = (state, method, action) => {
  state[method].isLoaded = true;
  state[method].error = action.payload;
};

const setAuthSuccess = (state, method, action) => {
  state.user = action.payload.user;
  state.isAuth = true;
  state[method].isLoaded = true;
};

const setLogoutSuccess = (state, method) => {
  state.user = null;
  state.isAuth = false;
  state[method].isLoaded = true;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
    isAuthChecked: false,
    isAuthError: null,
    login: createRequestState(),
    registration: createRequestState(),
    logout: createRequestState(),
  },
  reducers: {},
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => setPending(state, "login"))
      .addCase(login.fulfilled, (state, action) =>
        setAuthSuccess(state, "login", action)
      )
      .addCase(login.rejected, (state, action) =>
        setRejected(state, "login", action)
      );

    // REGISTRATION
    builder
      .addCase(registration.pending, (state) =>
        setPending(state, "registration")
      )
      .addCase(registration.fulfilled, (state, action) =>
        setAuthSuccess(state, "registration", action)
      )
      .addCase(registration.rejected, (state, action) =>
        setRejected(state, "registration", action)
      );

    // LOGOUT
    builder
      .addCase(logout.pending, (state) => setPending(state, "logout"))
      .addCase(logout.fulfilled, (state) => setLogoutSuccess(state, "logout"))
      .addCase(logout.rejected, (state, action) =>
        setRejected(state, "logout", action)
      );

    // CHECK AUTH
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthError = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
        state.isAuthError = action.payload;
      });
  },
});

export default authSlice.reducer;
