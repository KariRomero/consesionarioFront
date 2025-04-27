// src/components/Admin/finanzas/CrearGastoModal.tsx

'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { prod_url } from '@/utils/routes';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CrearGastoModalProps {
  isOpen: boolean;
  onClose: () => void;
  mesId: string;
  onGastoRegistrado: () => void;
  anio: number;
  mes: number;
  
}

export default function CrearGastoModal({ isOpen, onClose, mesId, onGastoRegistrado, anio, mes }: CrearGastoModalProps) {
  const [form, setForm] = useState({
    dia: '',
    descripcion: '',
    monto: '',
    categoria: '',
    pagadoPor: 'PLAYER1',
    esDelFondoComun: false,
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const fechaGasto = `${anio}-${mes.toString().padStart(2, '0')}-${form.dia.padStart(2, '0')}T00:00:00.000Z`;

      await axios.post(`${prod_url}/finanzas/gasto`, {
        mesId,
        fecha: `${anio}-${String(mes).padStart(2, '0')}-${String(form.dia).padStart(2, '0')}T00:00:00.000Z`,
        monto: Number(form.monto),
        descripcion: form.descripcion,
        categoria: form.categoria,
        pagadoPor: form.pagadoPor,
        esDelFondoComun: form.esDelFondoComun,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Gasto registrado');
      onGastoRegistrado();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar gasto');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" className="max-w-md">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="text-xl font-bold">Registrar Gasto</ModalHeader>
            <ModalBody className="space-y-4">
            <Input
  label="Día del gasto"
  type="number"
  min={1}
  max={31}
  className="w-full"
  value={form.dia}
  onChange={(e) => setForm({ ...form, dia: e.target.value })}
  isRequired
/>

              <Input
                label="Categoría"
                placeholder="Ej: Infraestructura"
                className="w-full"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                isRequired
              />

              <Input
                label="Descripción"
                placeholder="Ej: Pago del servidor"
                className="w-full"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                isRequired
              />

              <Input
                label="Monto"
                type="number"
                placeholder="Ej: 5000"
                className="w-full"
                value={form.monto}
                onChange={(e) => setForm({ ...form, monto: e.target.value })}
                isRequired
              />

              <Select
                label="Pagado por"
                className="w-full"
                value={form.pagadoPor}
                onChange={(e) => setForm({ ...form, pagadoPor: e.target.value as 'PLAYER1' | 'PLAYER2' })}
                isRequired
              >
                <SelectItem key="PLAYER1" value="PLAYER1">PLAYER1</SelectItem>
                <SelectItem key="PLAYER2" value="PLAYER2">PLAYER2</SelectItem>
              </Select>

              <Select
                label="¿Es del fondo común?"
                className="w-full"
                value={form.esDelFondoComun ? 'true' : 'false'}
                onChange={(e) => setForm({ ...form, esDelFondoComun: e.target.value === 'true' })}
                isRequired
              >
                <SelectItem key="true" value="true">Sí</SelectItem>
                <SelectItem key="false" value="false">No</SelectItem>
              </Select>
            </ModalBody>

            <ModalFooter className="flex justify-between">
              <Button variant="light" onPress={close}>
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
}