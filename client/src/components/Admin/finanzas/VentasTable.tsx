'use client';

import React from 'react';

interface Venta {
  id: string;
  fechaVenta: string;
  vehiculo: {
    modelo: string;
    brand: { nombre: string };
    dominio: string;
  } | null;
  precioVenta: number;
  gananciaNeta: number;
  porcentajeAFondo: number;
  porcentajeSocio1: number;
  porcentajeSocio2: number;
}

interface VentasTableProps {
  ventas: Venta[];
}

export default function VentasTable({ ventas }: VentasTableProps) {
  if (ventas.length === 0) {
    return <p className="p-4 text-gray-500">No hay ventas registradas este mes.</p>;
  }

  return (
    <div className="overflow-auto rounded shadow-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-left">Vehículo</th>
            <th className="p-2 text-left">Precio Venta</th>
            <th className="p-2 text-left">Ganancia Neta</th>
            <th className="p-2 text-left">% Fondo</th>
            <th className="p-2 text-left">Fondo $</th>
            <th className="p-2 text-left">Ganancia PLAYER1</th>
            <th className="p-2 text-left">Ganancia PLAYER2</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            const vehiculoInfo = venta.vehiculo
              ? `${venta.vehiculo.brand?.nombre ?? ''} ${venta.vehiculo.modelo ?? ''} (${venta.vehiculo.dominio ?? ''})`
              : '—';

            const montoFondo = (venta.gananciaNeta * venta.porcentajeAFondo) / 100;
            const saldoDisponible = venta.gananciaNeta - montoFondo;
            const gananciaPlayer1 = (saldoDisponible * venta.porcentajeSocio1) / 100;
            const gananciaPlayer2 = (saldoDisponible * venta.porcentajeSocio2) / 100;

            return (
              <tr key={venta.id} className="border-b">
                <td className="p-2">{new Date(venta.fechaVenta).toLocaleDateString()}</td>
                <td className="p-2">{vehiculoInfo}</td>
                <td className="p-2">${venta.precioVenta.toLocaleString()}</td>
                <td className="p-2">${venta.gananciaNeta.toLocaleString()}</td>
                <td className="p-2">{venta.porcentajeAFondo}%</td>
                <td className="p-2">${montoFondo.toLocaleString()}</td>
                <td className="p-2">${gananciaPlayer1.toLocaleString()}</td>
                <td className="p-2">${gananciaPlayer2.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}