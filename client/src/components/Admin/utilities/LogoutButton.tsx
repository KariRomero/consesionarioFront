'use client';

import { useDispatch } from 'react-redux';
import { logoutAdmin } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem('adminData');
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at');
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 ml-10 bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Cerrar sesión
    </button>
  );
}