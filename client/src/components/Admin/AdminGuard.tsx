'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresAt = Number(localStorage.getItem('token_expires_at'));

    const isSessionValid = token && expiresAt && expiresAt > Date.now();

    if (!isSessionValid) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminData');
      localStorage.removeItem('token_expires_at');
      router.push('/admin/login');
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return <p className="p-10 text-center">Verificando sesión...</p>;

  return <>{children}</>;
}