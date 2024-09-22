// src/redux/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Exportar un despacho tipado
export const useAppDispatch: () => AppDispatch = useDispatch;
// Exportar un selector tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;