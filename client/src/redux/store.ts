// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import brandsReducer from './slices/brandsSlice';
import typesReducer from './slices/typeSlice';
import combustibleReducer from './slices/combustibleSlice';
import transmisionReducer from './slices/transmSlice';
import kilometrajeReducer from './slices/kilometrajeSlile';
import tiposReducer from './slices/tiposSlice';
import authReducer from './slices/authSlice';
import filtersReducer from './slices/filtersSlice'; // ✅ FALTA ESTA LÍNEA

const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    tipos: tiposReducer,
    types: typesReducer,
    combustibles: combustibleReducer,
    transmisiones: transmisionReducer,
    kilometraje: kilometrajeReducer,
    auth: authReducer,
    filters: filtersReducer, // ✅ ya está todo bien ahora
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;