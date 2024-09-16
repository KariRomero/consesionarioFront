// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import brandsReducer from './slices/brandsSlice';
import typesReducer from '../redux/slices/typeSlice'
import combustibleReducer from "../redux/slices/combustibleSlice"
import transmisionReducer from "../redux/slices/transmSlice"

const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    types: typesReducer,
    combustibles: combustibleReducer,
    transmisiones: transmisionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;