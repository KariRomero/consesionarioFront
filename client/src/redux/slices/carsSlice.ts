import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Vehiculo } from '@/types/vehiculo';
import ResolvingViewport from 'next/dist/lib/metadata/types/metadata-interface.js';
// interface Imagen {
//   id: number;
//   url: string;
//   vehiculoId: number;
// }

// interface Car {
//   id: number;
//   marca: string;
//   modelo: string;
//   tipo: string,
//   year: number;
//   descripcion: string;
//   precio: number;
//   kilometraje: number;
//   combustible: string;
//   transmision: string;
//   imagenes: Imagen[];
// }

interface CarsState {
  cars: Vehiculo[];
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [], 
  loading: false,
  error: null,
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

    const response = await axios.get<{ vehiculos: Vehiculo[] }>(`http://localhost:3000/vehiculos?${params.toString()}`);
    return response.data.vehiculos;
  }
);

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (id:number)=>{
  const response = await axios.get<{ vechiculo:Vehiculo }> (`http://localhost:3000/vehiculos/${id}`);
  // console.log(response.data);  
  return response.data
})

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
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Vehiculo[]>) => {
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