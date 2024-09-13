import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Imagen {
  id: number;
  url: string;
  vehiculoId: number;
}

interface Car {
  id: number;
  marca: string;
  modelo: string;
  year: number;
  descripcion: string;
  precio: number;
  kilometraje: number;
  combustible: string;
  transmision: string;
  imagenes: Imagen[];
}

interface CarsState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [], 
  loading: false,
  error: null,
};


export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const response = await axios.get<{ vehiculos: Car[] }>('http://localhost:3000/vehiculos'); 
  return response.data.vehiculos; 
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.loading = false;
        state.cars = action.payload;  
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cars';
      });
  },
});

export default carsSlice.reducer;