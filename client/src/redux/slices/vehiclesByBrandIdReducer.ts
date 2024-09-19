import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface VehiculosState {
  vehiculos: any[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; 
}

export const fetchVehiculosByBrandId = createAsyncThunk(
  'vehiculos/fetchByBrandId',
  async (brandId: string) => {
    const response = await axios.get(`http://localhost:3000/vehiculos/por-brand?brandId=${brandId}`);
    return response.data.vehiculos; 
    
  }
);

const vehiculosSlice = createSlice({
  name: 'vehiculos',
  initialState: {
    vehiculos: [],
    status: 'idle', 
    error: null,
  } as VehiculosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehiculosByBrandId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehiculosByBrandId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehiculos = action.payload;
      })
      .addCase(fetchVehiculosByBrandId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null; 
      });
  },
});

export default vehiculosSlice.reducer;
