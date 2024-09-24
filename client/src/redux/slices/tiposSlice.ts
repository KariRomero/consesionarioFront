import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Tipo from '@/types/tipo';

interface TipoState {
  tipos: Tipo[];
  tipo: Tipo | null;
  loading: boolean;
  error: string | null;
}

const initialState: TipoState = {
  tipos: [],
  tipo: null, 
  loading: false,
  error: null
};

export const fetchTipos = createAsyncThunk(
  'tipos/fetchTipos',
  async () => {
    const response = await axios.get('http://localhost:3000/tipos');    
    return response.data;
  }
);

export const fetchTiposById = createAsyncThunk(
  'tipos/fetchTiposById',
  async (id: number) => {
    const response = await axios.get(`http://localhost:3000/tipos/${id}`);
    return response.data;
  }
);


const tiposSlice = createSlice({
  name: 'tipos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTipos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTipos.fulfilled, (state, action) => {
        state.loading = false;
        state.tipos = action.payload;
      })
      .addCase(fetchTipos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching tipos';
      });
    builder
      .addCase(fetchTiposById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTiposById.fulfilled, (state, action) => {
        state.loading = false;
        state.tipo = action.payload;
      })
      .addCase(fetchTiposById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching tipo by ID';
      });
  }
});

export default tiposSlice.reducer;
