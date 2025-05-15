import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Brand } from '@/types/types';
import { prod_url } from '@/utils/routes';

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

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const res = await axios.get(`${prod_url}/brands`);
  return res.data.brands;
});

export const fetchBrandById = createAsyncThunk('brands/fetchBrandById', async (id: string) => {
  const res = await axios.get(`${prod_url}/brands/${id}`);
  return res.data;
});

export const createBrand = createAsyncThunk('brands/createBrand', async (newBrand: Partial<Brand>) => {
  const res = await axios.post(`${prod_url}/brands`, newBrand);
  return res.data;
});

export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async ({ id, updatedData }: { id: string; updatedData: Partial<Brand> }) => {
    const res = await axios.put(`${prod_url}/brands/${id}`, updatedData);
    return res.data;
  }
);

export const deleteBrand = createAsyncThunk('brands/deleteBrand', async (id: string) => {
  await axios.delete(`${prod_url}/brands/${id}`);
  return id;
});

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrand: (state) => {
      state.brand = null;
      state.loading = false;
      state.error = null;
    }
  },
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
        state.error = action.error.message || 'Error al obtener las marcas';
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
        state.error = action.error.message || 'Error al obtener la marca';
      });

    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al crear la marca';
      });

    builder
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.brands[index] = action.payload;
        if (state.brand?.id === action.payload.id) {
          state.brand = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al actualizar la marca';
      });

    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter((b) => b.id !== action.payload);
        if (state.brand?.id === action.payload) {
          state.brand = null;
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al eliminar la marca';
      });
  }
});

export const { clearBrand } = brandsSlice.actions;
export default brandsSlice.reducer;