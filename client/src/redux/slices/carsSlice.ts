import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Vehiculo } from '@/types/vehiculo';

interface CarsState {
  cars: Vehiculo[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
}

const initialState: CarsState = {
  cars: [],
  loading: false,
  error: null,
  page: 1,
  limit: 6,
  total: 0,
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (filters: {
    transmision?: string;
    combustible?: string;
    minKilometraje?: number;
    maxKilometraje?: number;
    minPrecio?: number;
    maxPrecio?: number;
    tipoId?: number;
    brandId?: number;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();

    if (filters.transmision) params.append('transmision', filters.transmision);
    if (filters.combustible) params.append('combustible', filters.combustible);
    if (filters.minKilometraje) params.append('minKilometraje', filters.minKilometraje.toString());
    if (filters.maxKilometraje) params.append('maxKilometraje', filters.maxKilometraje.toString());
    if (filters.minPrecio) params.append('minPrecio', filters.minPrecio.toString());
    if (filters.maxPrecio) params.append('maxPrecio', filters.maxPrecio.toString());
    if (filters.tipoId) params.append('tipoId', filters.tipoId.toString());
    if (filters.brandId) params.append('brandId', filters.brandId.toString());


    params.append('page', (filters.page || 1).toString());
    params.append('limit', (filters.limit || 6).toString());

    const response = await axios.get<{ vehiculos: Vehiculo[], total: number }>(
      `http://localhost:3000/vehiculos?${params.toString()}`
    );
    return response.data;
  }
);

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (id: number) => {
  const response = await axios.get<{ vehiculo: Vehiculo }>(`http://localhost:3000/vehiculos/${id}`);
  return response.data;
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    previousPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    resetPage: (state) => {
      state.page = 1;
    },
    goToLastPage: (state) => {
      state.page = Math.ceil(state.total / state.limit);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.vehiculos;
        state.total = action.payload.total;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cars';
      });
  },
});

export const { setPage, setLimit, nextPage, previousPage, resetPage, goToLastPage } = carsSlice.actions;
export default carsSlice.reducer;
