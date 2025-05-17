// redux/slices/filtersSlice.ts
import { prod_url } from '@/utils/routes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFilterOptions = createAsyncThunk(
    'filters/fetchFilterOptions',
    async (params?: Record<string, string>) => {
      const query = params
        ? '?' + new URLSearchParams(params).toString()
        : '';
      const { data } = await axios.get(`${prod_url}/vehiculos/filters/options${query}`);
      return data;
    }
  );
interface FilterState {
    loading: boolean;
    options: any; // Podés tiparlo mejor si tenés la interfaz del JSON
    error: string | null;
  }
  
  const initialState: FilterState = {
    loading: false,
    options: null,
    error: null,
  };

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar filtros';
      });
  },
});

export default filtersSlice.reducer;