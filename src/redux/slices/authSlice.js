import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api.js";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post("/auth/logout");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
