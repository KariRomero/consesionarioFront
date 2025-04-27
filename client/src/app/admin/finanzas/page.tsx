'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import toast from 'react-hot-toast';
import CrearGastoModal from '@/components/Admin/finanzas/CrearGastoModal';
import CrearVentaModal from '@/components/Admin/finanzas/CrearVentaModal';
import VentasTable from '@/components/Admin/finanzas/VentasTable';
  // import AportesTable from '@/components/Admin/finanzas/AportesTable';
import GastosTable from '@/components/Admin/finanzas/GastosTable';
interface MesFinanciero {
  id: string;
  anio: number;
  mes: number;
  estaCerrado: boolean;
  fondoComun?: number;
  fondoComunActual?: number;
  fondoComunFinal?: number;
}

interface DetalleMes {
  ventas: any[];
  gastos: any[];
  aportes: any[];
  fondoComunInicial: number;
  fondoComunFinal: number;
  fondoComunActual?: number;
  saldoPLAYER1?: number;
  saldoPLAYER2?: number;
  totalGanancia?: number;
  totalGastos?: number;
  gastosReintegrados?: number;
  totalAportes?: number;
  totalAFondo?: number;
}

// 🔥 Helper para mostrar el nombre del mes
const getNombreMes = (numeroMes: number) => {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return meses[numeroMes - 1];
};

export default function FinanzasPage() {
  const [meses, setMeses] = useState<MesFinanciero[]>([]);
  const [mesSeleccionado, setMesSeleccionado] = useState<string | null>(null);
  const [detalleMes, setDetalleMes] = useState<DetalleMes | null>(null);
  const [modalVentaAbierto, setModalVentaAbierto] = useState(false);
  const [modalGastoAbierto, setModalGastoAbierto] = useState(false);

  const fetchMeses = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${prod_url}/finanzas/mes-financiero`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      data.sort((a: MesFinanciero, b: MesFinanciero) => {
        if (a.anio !== b.anio) return a.anio - b.anio;
        return a.mes - b.mes;
      });
      setMeses(data);
      if (data.length > 0) {
        const mesAbierto = data.find((m: MesFinanciero) => !m.estaCerrado);
        if (mesAbierto) {
          setMesSeleccionado(mesAbierto.id);
        } else {
          setMesSeleccionado(data[data.length - 1].id);
        }
      }
    } catch (error) {
      toast.error('Error al cargar los meses');
    }
  };

  const fetchDetalleMes = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${prod_url}/finanzas/resumen/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetalleMes(data);
    } catch (error) {
      toast.error('Error al cargar detalle del mes');
    }
  };

  useEffect(() => {
    fetchMeses();
  }, []);

  useEffect(() => {
    if (mesSeleccionado) {
      fetchDetalleMes(mesSeleccionado);
    }
  }, [mesSeleccionado]);

  const mesActivo = meses.find((m) => m.id === mesSeleccionado);
  const estaCerrado = mesActivo?.estaCerrado;
  const gananciaMesPlayer1 = detalleMes?.ventas
  ?.flatMap((v) => v.ganancias || [])
  ?.filter((g) => g.socio === 'PLAYER1')
  ?.reduce((sum, g) => sum + g.monto, 0) || 0;

const gananciaMesPlayer2 = detalleMes?.ventas
  ?.flatMap((v) => v.ganancias || [])
  ?.filter((g) => g.socio === 'PLAYER2')
  ?.reduce((sum, g) => sum + g.monto, 0) || 0;
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Finanzas</h1>
        <div className="flex gap-4">
          <Button
            color="primary"
            onClick={() => setModalGastoAbierto(true)}
            isDisabled={!!estaCerrado}
          >
            + Registrar gasto
          </Button>
          <Button
            color="success"
            onClick={() => setModalVentaAbierto(true)}
            isDisabled={!!estaCerrado}
          >
            + Registrar venta
          </Button>
        </div>
      </div>

      {meses.length > 0 ? (
        <Tabs
          aria-label="Meses financieros"
          selectedKey={mesSeleccionado}
          onSelectionChange={(key) => setMesSeleccionado(key as string)}
        >
          {meses.map((mes) => (
            <Tab
              key={mes.id}
              title={
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={mes.estaCerrado ? faCheckCircle : faHourglassHalf}
                    className={mes.estaCerrado ? 'text-green-500' : 'text-yellow-500'}
                  />
                  {`${getNombreMes(mes.mes)} de ${mes.anio}`}
                </div>
              }
            >
              <div className="p-4 bg-gray-100 rounded shadow-md space-y-6">
                <p className="text-lg font-semibold">
                  {mes.estaCerrado ? 'Fondo común final del mes: ' : 'Fondo común actual: '}
                  {mes.estaCerrado 
                    ? `$${mes.fondoComunFinal?.toLocaleString()}`
                    : `$${mes.fondoComunActual?.toLocaleString()}`}
                </p>

                {detalleMes ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Ventas</h2>
                      <VentasTable ventas={detalleMes.ventas} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-2">Gastos</h2>
                      <GastosTable gastos={detalleMes.gastos} />
                    </div>

                    {/* <div>
                      <h2 className="text-xl font-bold mb-2">Aportes</h2>
                      <AportesTable aportes={detalleMes.aportes} />
                    </div> */}

                    {/* 📋 RESUMEN FINAL / PARCIAL */}
                    <div className="bg-white p-4 rounded shadow-md space-y-2">
  <h2 className="text-2xl font-bold">
    {mes.estaCerrado ? 'Resumen final del mes' : 'Resumen parcial del mes'}
  </h2>
  <p>Fondo común inicial del mes: ${detalleMes.fondoComunInicial?.toLocaleString()}</p>
  <p>Total aportes: ${detalleMes.totalAportes?.toLocaleString()}</p>
  <p>Total ventas: {detalleMes.ventas.length}</p>
  <p>Ganancia neta total: ${detalleMes.totalGanancia?.toLocaleString()}</p>
  <p>Total al fondo de las ventas: ${detalleMes.totalAFondo?.toLocaleString()}</p>
  <p>Gastos del mes: ${detalleMes.totalGastos?.toLocaleString()}</p>
  <p>Gastos reintegrados: ${detalleMes.gastosReintegrados?.toLocaleString()}</p>
  <p>Ganancia final PLAYER1: ${gananciaMesPlayer1?.toLocaleString()}</p>
  <p>Ganancia final PLAYER2: ${gananciaMesPlayer2?.toLocaleString()}</p>
</div>
                  </div>
                ) : (
                  <p className="p-4">Cargando detalle del mes...</p>
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      ) : (
        <p>No hay meses cargados aún.</p>
      )}

<CrearVentaModal
  isOpen={modalVentaAbierto}
  onClose={() => setModalVentaAbierto(false)}
  mesId={mesSeleccionado ?? ''}
  anio={mesActivo?.anio ?? 0}
  mes={mesActivo?.mes ?? 0}
  onVentaRegistrada={async () => {
    await fetchDetalleMes(mesSeleccionado!);
    await fetchMeses(); // 👈 refrescar también los meses
  }}
/>
<CrearGastoModal
  isOpen={modalGastoAbierto}
  onClose={() => setModalGastoAbierto(false)}
  mesId={mesSeleccionado ?? ''}
  anio={mesActivo?.anio ?? 0}
  mes={mesActivo?.mes ?? 0}
  onGastoRegistrado={async () => {
    await fetchDetalleMes(mesSeleccionado!);
    await fetchMeses(); // 👈 refrescar también los meses
  }}
/>
    </section>
  );
}