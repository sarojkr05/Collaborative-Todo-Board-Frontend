import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

export const fetchTasks = createAsyncThunk("task/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/tasks");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
  }
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
