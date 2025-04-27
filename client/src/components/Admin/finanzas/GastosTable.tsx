'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface Gasto {
  id: string;
  fecha: string;
  descripcion: string;
  monto: number;
  categoria: string;
  pagadoPor: 'PLAYER1' | 'PLAYER2';
  esDelFondoComun: boolean;
  reintegrado: boolean;
}

interface GastosTableProps {
  gastos: Gasto[];
}

export default function GastosTable({ gastos }: GastosTableProps) {
  if (gastos.length === 0) {
    return <p className="p-4 text-gray-500">No hay gastos registrados este mes.</p>;
  }

  return (
    <div className="overflow-auto rounded shadow-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-left">Descripción</th>
            <th className="p-2 text-left">Monto</th>
            <th className="p-2 text-left">Categoría</th>
            <th className="p-2 text-left">Pagado por</th>
            <th className="p-2 text-left">Fondo común</th>
            <th className="p-2 text-left">Reintegrado de venta</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.id} className="border-b">
              <td className="p-2">{new Date(gasto.fecha).toLocaleDateString()}</td>
              <td className="p-2">{gasto.descripcion}</td>
              <td className="p-2">${gasto.monto.toLocaleString()}</td>
              <td className="p-2">{gasto.categoria}</td>
              <td className="p-2">{gasto.pagadoPor}</td>
              <td className="p-2">
                {gasto.esDelFondoComun ? (
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                ) : (
                  <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                )}
              </td>
              <td className="p-2">
                {gasto.reintegrado ? (
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                ) : (
                  <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}