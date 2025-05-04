import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Checkbox,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { prod_url } from "@/utils/routes";
import { useRouter } from "next/navigation";

interface Vehiculo {
  id: string;
  modelo: string;
  year: number;
  dominio?: string;
  clienteId?: string | null;
}

interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  direccion?: string;
  vehiculos?: Vehiculo[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente;
  onUpdated?: () => void;
}

const ClienteEditModal: React.FC<Props> = ({ isOpen, onClose, cliente, onUpdated }) => {
  const router = useRouter();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [form, setForm] = useState({
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    dni: cliente.dni,
    telefono: cliente.telefono,
    email: cliente.email,
    direccion: cliente.direccion || "",
    vehiculoIds: cliente.vehiculos?.map((v) => v.id) || [],
  });

  const fetchVehiculos = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${prod_url}/vehiculos/findAll/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehiculos(
      res.data.vehiculos?.filter(
        (v: Vehiculo) => !v.clienteId || form.vehiculoIds.includes(v.id)
      ) || []
    );
  };

  useEffect(() => {
    if (isOpen) {
      setForm({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion || "",
        vehiculoIds: cliente.vehiculos?.map((v) => v.id) || [],
      });
      fetchVehiculos();
    }
  }, [isOpen, cliente.id]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    setTimeout(() => {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      window.scrollBy(0, -30);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehiculoToggle = (id: string) => {
    setForm((prev) => {
      const updated = prev.vehiculoIds.includes(id)
        ? prev.vehiculoIds.filter((vid) => vid !== id)
        : [...prev.vehiculoIds, id];
      return { ...prev, vehiculoIds: updated };
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${prod_url}/clientes/${cliente.id}`, {
        nombre: form.nombre,
        apellido: form.apellido,
        dni: form.dni,
        telefono: form.telefono,
        email: form.email,
        direccion: form.direccion,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      for (const v of vehiculos) {
        const asignado = form.vehiculoIds.includes(v.id);
        const yaAsignado = v.clienteId === cliente.id;
        if (asignado && !yaAsignado) {
          await axios.put(`${prod_url}/vehiculos/${v.id}`, { clienteId: cliente.id }, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (!asignado && yaAsignado) {
          await axios.put(`${prod_url}/vehiculos/${v.id}`, { clienteId: null }, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      }

      toast.success("Cliente actualizado");
      await fetchVehiculos();
      onClose();
      onUpdated?.();
      router.refresh();
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      toast.error(msg || "Error al actualizar cliente");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      className="w-full max-w-2xl"
    >
      <ModalContent className="flex flex-col h-[100dvh] xl:h-auto xl:max-h-[90vh] xl:my-auto transition-all duration-300 ease-in-out">
        {(close) => (
          <>
            <ModalHeader className="text-xl font-bold text-left 2xl:flex 2xl:justify-center">
              Editar Cliente
            </ModalHeader>
            <ModalBody className="flex-1 overflow-y-auto px-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} onFocus={handleFocus} isRequired />
                <Input label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} onFocus={handleFocus} isRequired />
                <Input label="DNI" name="dni" value={form.dni} onChange={handleChange} onFocus={handleFocus} isRequired />
                <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} onFocus={handleFocus} isRequired />
                <Input label="Email" name="email" value={form.email} onChange={handleChange} onFocus={handleFocus} isRequired />
                <Input label="Dirección (opcional)" name="direccion" value={form.direccion} onChange={handleChange} onFocus={handleFocus} />
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2 2xl:text-center">Vehículos sin cliente</p>
                <div className="max-h-40 xl:max-h-[300px] overflow-y-auto border rounded p-2 space-y-2">
                  {vehiculos.length === 0 && <p className="text-sm text-gray-500">No hay vehículos disponibles</p>}
                  {vehiculos.map((v) => (
                    <div key={v.id} className="flex items-center gap-2">
                      <Checkbox
                        isSelected={form.vehiculoIds.includes(v.id)}
                        onValueChange={() => handleVehiculoToggle(v.id)}
                      >
                        {v.modelo} ({v.year}) {v.dominio ? `- Dominio: ${v.dominio.toUpperCase()}` : ""}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>

              {form.vehiculoIds.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Vehículos seleccionados</p>
                  <div className="flex flex-wrap gap-2">
                    {vehiculos
                      .filter((v) => form.vehiculoIds.includes(v.id))
                      .map((v) => (
                        <span
                          key={v.id}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {v.modelo} ({v.year})
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter className="sticky bottom-0 bg-white p-4 shadow-md z-10">
              <Button variant="light" onPress={close} className="text-black">
                Cancelar
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Guardar cambios
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ClienteEditModal;
