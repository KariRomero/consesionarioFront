import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Vehiculo } from '@/types/types';
import { prod_url } from '@/utils/routes';

interface CarsState {
  cars: Vehiculo[]
  destacados: Vehiculo[] // ✅ destacado separado
  car: Vehiculo | null
  loading: boolean
  error: string | null
  page: number
  limit: number
  total: number
}

const initialState: CarsState = {
  cars: [],
  destacados: [],
  car: null,
  loading: false,
  error: null,
  page: 1,
  limit: 6,
  total: 0,
}


export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (
    {
      filters,
      editable = false,
      token,
    }: {
      filters: {
        transmision?: string;
        combustible?: string;
        minKilometraje?: number;
        maxKilometraje?: number;
        minPrecio?: number;
        maxPrecio?: number;
        tipoId?: string;
        brandId?: string;
        page?: number;
        limit?: number;
      };
      editable?: boolean;
      token?: string;
    },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();

      if (filters.transmision) params.append('transmision', filters.transmision);
      if (filters.combustible) params.append('combustible', filters.combustible);
      if (filters.minKilometraje) params.append('kmMin', filters.minKilometraje.toString());
      if (filters.maxKilometraje) params.append('kmMax', filters.maxKilometraje.toString());
      if (filters.minPrecio) params.append('precioMin', filters.minPrecio.toString());
      if (filters.maxPrecio) params.append('precioMax', filters.maxPrecio.toString());
      if (filters.tipoId) params.append('tipoId', filters.tipoId.toString());
      if (filters.brandId) params.append('brandId', filters.brandId.toString());

      params.append('page', (filters.page || 1).toString());
      params.append('limit', (filters.limit || 6).toString());

      const endpoint = editable
        ? `${prod_url}/vehiculos/findAll/admin`
        : `${prod_url}/vehiculos`;

      const headers = editable && token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const response = await axios.get<{ vehiculos: Vehiculo[]; total: number }>(
        `${endpoint}?${params.toString()}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Error al cargar los vehículos:', error);
      return thunkAPI.rejectWithValue('Error al cargar los vehículos');
    }
  }
);

export const fetchDestacados = createAsyncThunk(
  'cars/fetchDestacados',
  async () => {
    const response = await axios.get<{ vehiculos: Vehiculo[] }>(
      `${prod_url}/vehiculos?destacado=true&page=1&limit=99999`
    )
    return response.data.vehiculos
  }
)


export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id: string) => {
    const response = await axios.get<{ vehiculo: Vehiculo }>(`${prod_url}/vehiculos/${id}`);
    return response.data;
  }
);

export const fetchCarsByBrand = createAsyncThunk(
  'cars/fetchCarsByBrand',
  async (brandId:string) => {
    const response = await axios.get<{ vehiculos: Vehiculo[]}>(`${prod_url}/vehiculos?brandId=${brandId}`);
    return response.data;
  }
)

export const fetchCarsByTipo = createAsyncThunk(
  'cars/fetchCarsByTipo',
  async (tipoId:string) => {
    const response = await axios.get<{ vehiculos: Vehiculo[]}>(`${prod_url}/vehiculos?tipoId=${tipoId}`);
    return response.data;
  }
)

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
      // fetchCars
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
      })
      // fetchCarById
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload.vehiculo;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch car by ID';
      })
      //fetchCarsByBrand
      .addCase(fetchCarsByBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarsByBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.vehiculos
      })
      .addCase(fetchCarsByBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cars by brands';
      })


     
    // destacados separados
    .addCase(fetchDestacados.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchDestacados.fulfilled, (state, action) => {
      state.loading = false
      state.destacados = action.payload
    })
    .addCase(fetchDestacados.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Error al cargar destacados'
    })
      //fetchCarsByTipo
      .addCase(fetchCarsByTipo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarsByTipo.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.vehiculos
      })
      .addCase(fetchCarsByTipo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cars by tipo';
      })
  },
});

export const { setPage, setLimit, nextPage, previousPage, resetPage, goToLastPage } = carsSlice.actions;
export default carsSlice.reducer;