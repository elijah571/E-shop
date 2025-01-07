import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearUser } from "./loginSlice";

// Async thunk for user logout
export const fetchUserLogout = createAsyncThunk(
  'logout/fetchUserLogout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/logout', {}, { 
        withCredentials: true 
      });
      // Clear user data from localStorage if logout is successful
      localStorage.removeItem('userLogin');
      
      // Dispatch clearUser to update Redux state
      dispatch(clearUser);

      return response.data; // Return the response data to be used in the slice
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.loading = false;
        // Logout successful, Redux state is cleared through clearUser action
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logoutSlice.reducer;
