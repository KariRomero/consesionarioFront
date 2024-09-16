import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CombustibleState {
  combustibles: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CombustibleState = {
  combustibles: [],
  loading: false,
  error: null,
};

// Async thunk para obtener los combustibles
export const fetchCombustibles = createAsyncThunk<string[]>(
  'combustibles/fetchCombustibles',
  async () => {
    const response = await axios.get('http://localhost:3000/vehiculos/combustible');
    return response.data;
  }
);

const combustibleSlice = createSlice({
  name: 'combustibles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCombustibles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCombustibles.fulfilled, (state, action) => {
        state.loading = false;
        state.combustibles = action.payload;
      })
      .addCase(fetchCombustibles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching combustibles';
      });
  },
});

export default combustibleSlice.reducer;