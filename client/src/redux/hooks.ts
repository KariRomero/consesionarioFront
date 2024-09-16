import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;  // Exporta el hook tipado