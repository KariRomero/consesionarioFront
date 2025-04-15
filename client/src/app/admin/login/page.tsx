'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '@/redux/slices/authSlice';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  // 🔐 Verificar si ya hay sesión activa
  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminData = localStorage.getItem('adminData');
    const expiresAt = Number(localStorage.getItem('token_expires_at'));

    const isSessionValid = token && adminData && expiresAt > Date.now();

    if (isSessionValid) {
      dispatch(loginAdmin(JSON.parse(adminData)));
      router.push('/admin/vehiculos');
    } else {
      // ⚠️ Limpia el storage si expiró
      localStorage.removeItem('token');
      localStorage.removeItem('adminData');
      localStorage.removeItem('token_expires_at');
    }
  }, [dispatch, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      const adminData = response.data;

      if (adminData?.access_token) {
        // 🧠 Guardar expiración (1 hora)
        const expiresAt = Date.now() + 60 * 60 * 1000;

        // ✅ Guardar en Redux
        dispatch(loginAdmin(adminData));

        // ✅ Guardar en localStorage
        localStorage.setItem('token', adminData.access_token);
        localStorage.setItem('adminData', JSON.stringify(adminData));
        localStorage.setItem('token_expires_at', String(expiresAt));

        // ✅ Redirigir
        router.push('/admin/vehiculos');
      } else {
        setError('Login inválido.');
      }
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error en el servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login de Admin</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-black p-2 border:black rounded hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}