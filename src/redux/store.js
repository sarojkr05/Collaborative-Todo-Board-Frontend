import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import taskReducer from "./slices/taskSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  },
});

export default store;
