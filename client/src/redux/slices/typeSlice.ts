import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Definimos el estado inicial
interface TypesState {
  types: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TypesState = {
  types: [],
  loading: false,
  error: null,
};

// Thunk para obtener los tipos de vehículos únicos desde el backend
export const fetchTypes = createAsyncThunk('types/fetchTypes', async () => {
  const response = await axios.get<string[]>('http://localhost:3000/vehiculos/tipos');
  return response.data;
});

// Slice de Redux para tipos de vehículos
const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al obtener los tipos de vehículos';
      });
  },
});

export default typesSlice.reducer;