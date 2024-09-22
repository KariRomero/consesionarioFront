// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import brandsReducer from './slices/brandsSlice';
import typesReducer from '../redux/slices/typeSlice'
import combustibleReducer from "../redux/slices/combustibleSlice"
import transmisionReducer from "../redux/slices/transmSlice"
import kilometrajeReducer from "../redux/slices/kilometrajeSlile"
import tiposReducer from "../redux/slices/tiposSlice";
const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    tipos: tiposReducer,
    types: typesReducer,
    combustibles: combustibleReducer,
    transmisiones: transmisionReducer,
    kilometraje: kilometrajeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;