'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/components/Admin/utilities/LogoutButton';

export default function AdminPanelPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return <p className="text-center p-10">Cargando...</p>;

  return (
    <div className="p-10">
    <h1 className="text-3xl font-bold">Bienvenido al panel del admin</h1>
    <LogoutButton />
  </div>

  );
}