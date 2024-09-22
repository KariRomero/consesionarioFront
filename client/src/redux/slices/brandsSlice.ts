import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Vehiculo {
  id: number;
  modelo: string;
  year: number;
  descripcion: string;
  precio: number;
  transmision: string;
  combustible: string;
  kilometraje: number;
  imagenes: { url: string }[];
  tipoId: number;
  brandId: number;
  createdAt: string;
  updatedAt: string;
}

interface Brand {
    id: number;
    nombre: string;
    ImageBrand: string;
    createdAt: string;
    updatedAt: string;
    vehiculos?: Vehiculo[];
}

interface BrandState {
  brands: Brand[];
  brand: Brand | null;
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  brand: null, 
  loading: false,
  error: null
};

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    const response = await axios.get('http://localhost:3000/brands');
    return response.data.brands;
  }
);

export const fetchBrandById = createAsyncThunk(
  'brands/fetchBrandById',
  async (id: number) => {
    const response = await axios.get(`http://localhost:3000/brands/${id}`);
    return response.data;
  }
);


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
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching brands';
      });
    builder
      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload;
      })
      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching brand by ID';
      });
  }
});

export default brandsSlice.reducer;
