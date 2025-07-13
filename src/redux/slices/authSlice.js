import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/api.js';

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, thunkAPI) => {
  try {
    const res = await axios.post('/auth/login', formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (formData, thunkAPI) => {
  try {
    const res = await axios.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
