'use client';

import AdminGuard from '@/components/Admin/AdminGuard';
import Cars from '@/components/Cars/Cars';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <AdminGuard>
<section className="min-h-screen px-6 py-[0rem] lg:py-[0rem]">
          <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/admin/vehiculos/crear')}
            className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Crear vehículo
          </button>
        </div>

        <Cars editable />
      </section>
    </AdminGuard>
  );
}