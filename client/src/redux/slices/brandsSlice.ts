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

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async () => {
    const response = await axios.get(`${prod_url}/brands`);
    return response.data.brands;
  }
);

export const fetchBrandById = createAsyncThunk(
  'brands/fetchBrandById',
  async (id: string) => {
    const response = await axios.get(`${prod_url}/brands/${id}`);
    return response.data;
  }
);

export const createBrand = createAsyncThunk(
  'brands/createBrand',
  async (newBrand: Partial<Brand>) => {
    const response = await axios.post(`${prod_url}/brands`, newBrand);
    return response.data;
  }
);

export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async ({ id, updatedData }: { id: string; updatedData: Partial<Brand> }) => {
    const response = await axios.put(`${prod_url}/brands/${id}`, updatedData);
    return response.data;
  }
);

export const deleteBrand = createAsyncThunk(
  'brands/deleteBrand',
  async (id: string) => {
    await axios.delete(`${prod_url}/brands/${id}`);
    return id;
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
        state.error = action.error.message || 'Error creating brand';
      });

    builder
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        if (state.brand?.id === action.payload.id) {
          state.brand = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error updating brand';
      });

    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(b => b.id !== action.payload);
        if (state.brand?.id === action.payload) {
          state.brand = null;
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error deleting brand';
      });

  }
});

export default brandsSlice.reducer;
