import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Brand {
    id: number;
    nombre: string;
    ImageBrand: string;
    createdAt: string;
    updatedAt: string;
}

interface BrandState{
  brands: Brand[],
  loading: boolean,
  error: string | null,
}

const initialState : BrandState = {
  brands: [],
  loading:false,
  error:null 
}

export const fetchBrands = createAsyncThunk(
    'brands/fetchBrands',
    async () => {
        const response = await axios.get('http://localhost:3000/brands');
        return response.data.brands; 
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
              state.brands= action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Error fetching brands';
            });
    },
});

export default brandsSlice.reducer;
