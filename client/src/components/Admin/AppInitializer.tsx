'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin, logoutAdmin } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function AppInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const expiresAtRaw = localStorage.getItem('token_expires_at');
    const now = new Date().getTime();

    // Si la sesión expiró, limpiar y redirigir
    if (expiresAtRaw && now > Number(expiresAtRaw)) {
      console.warn('⏳ Sesión expirada');
      localStorage.removeItem('adminData');
      localStorage.removeItem('token');
      localStorage.removeItem('token_expires_at');
      dispatch(logoutAdmin());
      router.push('/admin/login');
      return;
    }

    const adminRaw = localStorage.getItem('adminData');
    if (adminRaw) {
      const admin = JSON.parse(adminRaw);
      dispatch(loginAdmin(admin));
    }
  }, [dispatch, router]);

  return null;
}