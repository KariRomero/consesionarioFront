import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Tipo } from '@/types/types';
import { prod_url } from '@/utils/routes';

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

export const postTipo = createAsyncThunk(
  'tipos/createTipo',
  async (formData: FormData) => {
<<<<<<< HEAD
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tipos`, formData);
=======
    const response = await axios.post(`${prod_url}/tipos`, formData);
>>>>>>> b4a171e6418a247aaed82458d57927887dc03dec
    return response.data
  }
)

export const fetchTipos = createAsyncThunk(
  'tipos/fetchTipos',
  async () => {
<<<<<<< HEAD
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tipos`);
=======
    const response = await axios.get(`${prod_url}/tipos`);
>>>>>>> b4a171e6418a247aaed82458d57927887dc03dec
    return response.data;
  }
);

export const fetchTiposById = createAsyncThunk(
  'tipos/fetchTiposById',
<<<<<<< HEAD
  async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tipos/${id}`);
=======
  async (id: string) => {
    const response = await axios.get(`${prod_url}/tipos/${id}`);
>>>>>>> b4a171e6418a247aaed82458d57927887dc03dec
    return response.data;
  }
);

export const deleteTiposById = createAsyncThunk(
  'tipos/deleteYTiposById',
<<<<<<< HEAD
  async (id: number) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tipos/${id}`);
=======
  async (id: string) => {
    const response = await axios.delete(`${prod_url}/tipos/${id}`);
>>>>>>> b4a171e6418a247aaed82458d57927887dc03dec
    return { id };
  }
)

export const updateTipo = createAsyncThunk(
  'tipos/updateTipo',
<<<<<<< HEAD
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tipos/${id}`, formData);    return response.data;
=======
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const response = await axios.put(`${prod_url}/tipos/${id}`, formData);
    return response.data;
>>>>>>> b4a171e6418a247aaed82458d57927887dc03dec
  }
);

const tiposSlice = createSlice({
  name: 'tipos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTipo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTipo.fulfilled, (state, action) => {
        state.loading = false;
        state.tipos = state.tipos.map(tipo =>
          tipo.id === action.payload.id ? action.payload : tipo
        );
        state.error = null;
      })
      .addCase(updateTipo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar el tipo';
      });
    builder
      .addCase(postTipo.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(postTipo.fulfilled, (state, action) => {
        state.loading = false;
        state.tipos = [...state.tipos, action.payload]
        state.error = null
      })
      .addCase(postTipo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al rear Tipo'
      })
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
    builder
      .addCase(deleteTiposById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTiposById.fulfilled, (state, action) => {
        state.loading = false;
        state.tipos = state.tipos.filter((tipo) => tipo.id !== action.payload.id);
      })
      .addCase(deleteTiposById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar'

      })
  }
});

export default tiposSlice.reducer;
