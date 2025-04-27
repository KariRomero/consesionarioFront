'use client';

import React from 'react';

interface ResumenTabProps {
  fondoComun: number;
  ventasTotales: number;
  gastosTotales: number;
  aportesTotales: number;
}

export default function ResumenTab({
  fondoComun,
  ventasTotales,
  gastosTotales,
  aportesTotales,
}: ResumenTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">💰 Fondo Común</h2>
        <p className="text-2xl">${fondoComun.toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">🛒 Ventas Totales</h2>
        <p className="text-2xl">${ventasTotales.toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">💸 Gastos Totales</h2>
        <p className="text-2xl">${gastosTotales.toLocaleString()}</p>
      </div>

      {/* <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">🏦 Aportes al Fondo</h2>
        <p className="text-2xl">${aportesTotales.toLocaleString()}</p>
      </div> */}
    </div>
  );
}