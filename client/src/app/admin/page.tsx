'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import LogoutButton from '@/components/Admin/utilities/LogoutButton';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28'];

export default function AdminPanelPage() {
  const [checking, setChecking] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    axios.get(`${prod_url}/vehiculos/estadisticas`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setData(res.data);
      setChecking(false);
    }).catch(err => {
      console.error(err);
      window.location.href = '/admin/login';
    });
  }, []);

  if (checking) return <p className="text-center p-10">Cargando panel...</p>;

  return (
<section className="min-h-screen pt-10 px-6 bg-white">
      <div className="flex justify-between items-center">
      <div className="w-full flex justify-center mt-10 mb-10">
  <h1 className="text-4xl font-bold text-center">Panel de estadísticas</h1>
</div>
              <LogoutButton />
      </div>

      {/* 📊 Resumen rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatBox label="Vehículos totales" value={data.total} />
        <StatBox label="Vendidos" value={data.vendidos} />
        <StatBox label="No vendidos" value={data.noVendidos} />
       
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
   

 
</div>
<ChartSection title="Vehículos por Marca">
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data.porMarca} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <XAxis dataKey="nombre" stroke="#888" tick={{ fontSize: 12 }} />
      <YAxis allowDecimals={false} stroke="#888" tick={{ fontSize: 12 }} />
      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
      <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#6366f1" />
    </BarChart>
  </ResponsiveContainer>
</ChartSection>
<ChartSection title="Vehículos por Año">
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data.porAnio} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <XAxis dataKey="year" stroke="#888" tick={{ fontSize: 12 }} />
      <YAxis allowDecimals={false} stroke="#888" tick={{ fontSize: 12 }} />
      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
      <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#10b981" /> {/* Tailwind emerald-500 */}
    </BarChart>
  </ResponsiveContainer>
</ChartSection>
    </section>
  );
}

// 🔧 Componente de estadísticas simples
function StatBox({ label, value }: { label: string, value: any }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

// 🔧 Wrapper para gráficos
function ChartSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}