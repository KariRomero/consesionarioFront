import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface KilometrajeState {
  minKilometraje: number;
  maxKilometraje: number;
  loading: boolean;
  error: string | null;
}

const initialState: KilometrajeState = {
  minKilometraje: 0,
  maxKilometraje: 0,
  loading: false,
  error: null,
};

export const fetchKilometrajeRange = createAsyncThunk(
  'kilometraje/fetchKilometrajeRange',
  async () => {
    const response = await axios.get('http://localhost:3000/vehiculos/rango-kilometraje');
    return response.data;
  }
);

const kilometrajeSlice = createSlice({
  name: 'kilometraje',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKilometrajeRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKilometrajeRange.fulfilled, (state, action) => {
        state.loading = false;
        state.minKilometraje = action.payload.minKilometraje;
        state.maxKilometraje = action.payload.maxKilometraje;
      })
      .addCase(fetchKilometrajeRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching kilometraje range';
      });
  },
});

export default kilometrajeSlice.reducer;