'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Vehiculo } from '@/types/types';
import { prod_url } from '@/utils/routes';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  vehiculos: Vehiculo[];
}

export default function CrearContratoForm() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [tipo, setTipo] = useState<'A' | 'B' | 'C'>('A');
  const [fecha, setFecha] = useState<Date | null>(null);
  const [comision, setComision] = useState('');
  const [montoServicioInicial, setMontoServicioInicial] = useState('');

  const clienteSeleccionado = clientes.find((c) => c.id === clienteId);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }

    axios
      .get(`${prod_url}/clientes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClientes(res.data.clientes || res.data))
      .catch((err) => console.error('Error cargando clientes', err));
  }, []);

  useEffect(() => {
    if (tipo === 'C') {
      setMontoServicioInicial('');
    }
  }, [tipo]);

  const formatearFecha = (fecha: Date) => {
    // Fuerza horario medio para evitar conflictos por huso horario
    const ajustada = new Date(fecha);
    ajustada.setHours(12, 0, 0, 0);
  
    const dd = String(ajustada.getDate()).padStart(2, '0');
    const mm = String(ajustada.getMonth() + 1).padStart(2, '0');
    const yyyy = ajustada.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!fecha) {
      toast.error('Selecciona una fecha válida');
      return;
    }

    const payload = {
      tipo,
      clienteId,
      vehiculoId,
      porcentajeComision: Number(comision),
      fechaContrato: formatearFecha(fecha),
      montoServicioInicial: tipo === 'C' ? 0 : Number(montoServicioInicial),
    };

    try {
      await axios.post(`${prod_url}/contratos`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Contrato creado con éxito');
      router.push('/admin/contratos');
    } catch (error) {
      console.error('Error al crear contrato', error);
      toast.error('Hubo un problema al crear el contrato');
    }
  };

  const handlePreview = async () => {
    const token = localStorage.getItem('token');

    if (!fecha || !clienteId || !vehiculoId) {
      toast.error('Completa cliente, vehículo y fecha antes de previsualizar');
      return;
    }

    const queryParams = new URLSearchParams({
      tipo,
      clienteId,
      vehiculoId,
      porcentajeComision: comision,
      fechaContrato: formatearFecha(fecha),
      montoServicioInicial: tipo === 'C' ? '0' : montoServicioInicial,
    });

    try {
      const response = await axios.get(`${prod_url}/contratos/pdf-preview?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contrato-preview.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al generar previsualización', error);
      toast.error('Error generando el PDF');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Cliente</label>
        <select
          value={clienteId}
          onChange={(e) => {
            setClienteId(e.target.value);
            setVehiculoId('');
          }}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccionar cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Vehículo</label>
        <select
          value={vehiculoId}
          onChange={(e) => setVehiculoId(e.target.value)}
          disabled={!clienteId}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccionar vehículo</option>
          {clienteSeleccionado?.vehiculos.map((vehiculo) => (
            <option key={vehiculo.id} value={vehiculo.id}>
              {vehiculo.modelo} ({vehiculo.year})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Tipo de contrato</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as 'A' | 'B' | 'C')}
          className="w-full border rounded px-3 py-2"
        >
          <option value="A">Servicio de Detailling</option>
          <option value="B">Servicio de Lavado</option>
          <option value="C">Simple</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Fecha del contrato</label>
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full border rounded px-3 py-2"
          placeholderText="Seleccionar fecha"
        />
      </div>

      <div>
        <label className="block font-semibold">Porcentaje de comisión (%)</label>
        <input
          type="number"
          value={comision}
          onChange={(e) => setComision(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Monto del servicio inicial</label>
        <input
          type="number"
          value={montoServicioInicial}
          onChange={(e) => setMontoServicioInicial(e.target.value)}
          disabled={tipo === 'C'}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear contrato
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="bg-gray-600 text-black px-4 py-2 rounded hover:bg-gray-700"
        >
          Previsualizar contrato
        </button>
      </div>
    </form>
  );
}
