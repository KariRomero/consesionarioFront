// src/redux/slices/transmSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TransmisionState {
  transmisiones: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TransmisionState = {
  transmisiones: [],
  loading: false,
  error: null,
};

export const fetchTransmision = createAsyncThunk<string[]>(
  'transmision/fetchTransmision',
  async () => {
    const response = await axios.get('http://localhost:3000/vehiculos/transmision');
    return response.data;
  }
);

const transmisionSlice = createSlice({
  name: 'transmisiones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransmision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransmision.fulfilled, (state, action) => {
        state.loading = false;
        state.transmisiones = action.payload;
      })
      .addCase(fetchTransmision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching transmisiones';
      });
  },
});

export default transmisionSlice.reducer;