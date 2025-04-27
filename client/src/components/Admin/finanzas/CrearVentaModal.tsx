'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Input,
  Textarea,
} from '@nextui-org/react';
import { prod_url } from '@/utils/routes';
import toast from 'react-hot-toast';

interface CrearVentaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mesId: string;
  anio: number;    // 🔥 Año del mes financiero
  mes: number;     // 🔥 Mes del mes financiero
  onVentaRegistrada: () => void;
}

const CrearVentaModal: React.FC<CrearVentaModalProps> = ({
  isOpen,
  onClose,
  mesId,
  anio,
  mes,
  onVentaRegistrada,
}) => {
  const [vehiculos, setVehiculos] = useState<any[]>([]);
  const [form, setForm] = useState({
    vehiculoId: '',
    diaVenta: '', 
    precioVenta: '',
    gananciaNeta: '',
    porcentajeAFondo: '',
    porcentajePLAYER1: '',
    porcentajePLAYER2: '',
    descripcion: '',
  });

  useEffect(() => {
    if (!isOpen) return;
    const fetchVehiculos = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${prod_url}/vehiculos/findAll/admin?vendido=false`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehiculos(data.vehiculos);
      } catch (error) {
        toast.error('Error al obtener vehículos disponibles');
      }
    };
    fetchVehiculos();
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      const fechaVenta = `${anio}-${String(mes).padStart(2, '0')}-${String(form.diaVenta).padStart(2, '0')}T00:00:00.000Z`;

      await axios.post(`${prod_url}/finanzas/venta`, {
        mesId,
        vehiculoId: form.vehiculoId,
        fechaVenta,
        precioVenta: Number(form.precioVenta),
        gananciaNeta: Number(form.gananciaNeta),
        porcentajeAFondo: Number(form.porcentajeAFondo),
        porcentajePLAYER1: Number(form.porcentajePLAYER1),
        porcentajePLAYER2: Number(form.porcentajePLAYER2),
        descripcion: form.descripcion,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Venta registrada');
      onVentaRegistrada();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar venta');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" className="bg-background text-foreground">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="text-xl font-bold">Registrar Venta</ModalHeader>
            <ModalBody className="space-y-4">
              <Select
                label="Vehículo"
                placeholder="Seleccionar vehículo"
                className="w-full"
                value={form.vehiculoId}
                onChange={(e) => setForm({ ...form, vehiculoId: e.target.value })}
                isRequired
              >
                {vehiculos.map((v: any) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.brand?.nombre} {v.modelo} ({v.year})
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Día de venta"
                type="number"
                min={1}
                max={31}
                placeholder="Ej: 15"
                className="w-full"
                value={form.diaVenta}
                onChange={(e) => setForm({ ...form, diaVenta: e.target.value })}
                isRequired
              />

              <Input
                label="Precio de venta"
                type="number"
                className="w-full"
                value={form.precioVenta}
                onChange={(e) => setForm({ ...form, precioVenta: e.target.value })}
                isRequired
              />

              <Input
                label="Ganancia neta"
                type="number"
                className="w-full"
                value={form.gananciaNeta}
                onChange={(e) => setForm({ ...form, gananciaNeta: e.target.value })}
                isRequired
              />

              <Input
                label="% al fondo común"
                type="number"
                className="w-full"
                value={form.porcentajeAFondo}
                onChange={(e) => setForm({ ...form, porcentajeAFondo: e.target.value })}
                isRequired
              />

              <div className="flex gap-4">
                <Input
                  label="% PLAYER1"
                  type="number"
                  className="w-full"
                  value={form.porcentajePLAYER1}
                  onChange={(e) => setForm({ ...form, porcentajePLAYER1: e.target.value })}
                  isRequired
                />
                <Input
                  label="% PLAYER2"
                  type="number"
                  className="w-full"
                  value={form.porcentajePLAYER2}
                  onChange={(e) => setForm({ ...form, porcentajePLAYER2: e.target.value })}
                  isRequired
                />
              </div>

              <Textarea
                label="Descripción"
                placeholder="Ej: Venta directa con comisión del 2%"
                className="w-full"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              />
            </ModalBody>

            <ModalFooter className="flex justify-between">
              <Button variant="light" onPress={close} className="text-black">
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CrearVentaModal;