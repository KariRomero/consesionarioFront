// src/redux/slices/brandsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asíncrono para obtener las marcas
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const response = await axios.get('http://localhost:3000/vehiculos/marcas');  // Asegúrate de que la ruta esté configurada correctamente
  return response.data;  // Ajusta según la respuesta de tu backend
});

interface BrandsState {
  brands: string[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
};

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;  // Asegúrate de que `action.payload` sea del tipo `string[]`
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching brands';
      });
  },
});

export default brandsSlice.reducer;