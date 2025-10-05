import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// The async thunk handles the API call

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching doctors from:', `${import.meta.env.VITE_API_URL}/api/doctors/get-all-doctors`);
      const response = await api.get('/api/doctors/get-all-doctors');
      console.log('Response:', response);
      if (response.data?.success) {
        return response.data.data;
      } else {
        return rejectWithValue('No data received from server');
      }
    } catch (error) {
      console.error('Error in fetchDoctors:', error.response || error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const initialState = {
  list: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  // This handles the states of your API call (pending, success, failure)
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
