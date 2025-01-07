import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for user login
export const fetchUserLogin = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login', 
        userData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      localStorage.setItem('userLogin', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  userLogin: JSON.parse(localStorage.getItem('userLogin')) || null,
  error: null,
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userLogin = null; // Clear user data from Redux store
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userLogin = action.payload;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;
