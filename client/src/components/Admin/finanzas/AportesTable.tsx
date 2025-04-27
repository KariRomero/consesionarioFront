// 'use client';

// import React from 'react';

// interface Aporte {
//   id: string;
//   fecha: string;
//   monto: number;
//   aportadoPor: 'PLAYER1' | 'PLAYER2';
// }

// interface AportesTableProps {
//   aportes: Aporte[];
// }

// export default function AportesTable({ aportes }: AportesTableProps) {
//   if (aportes.length === 0) {
//     return <p className="p-4 text-gray-500">No hay aportes registrados este mes.</p>;
//   }

//   return (
//     <div className="overflow-auto rounded shadow-md">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 text-left">Fecha</th>
//             <th className="p-2 text-left">Aportado por</th>
//             <th className="p-2 text-left">Monto</th>
//           </tr>
//         </thead>
//         <tbody>
//           {aportes.map((aporte) => (
//             <tr key={aporte.id} className="border-b">
//               <td className="p-2">{new Date(aporte.fecha).toLocaleDateString()}</td>
//               <td className="p-2">{aporte.aportadoPor}</td>
//               <td className="p-2">${aporte.monto.toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }