"use client";

import { useEffect, useState } from "react";
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
  DatePicker,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { prod_url } from "@/utils/routes";
import { format } from "date-fns";
import { DateValue } from "@internationalized/date";

interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  vehiculos: { id: string; modelo: string; year: number }[];
}

interface CrearContratoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContratoCreado: () => void;
}

const CrearContratoModal: React.FC<CrearContratoModalProps> = ({
  isOpen,
  onClose,
  onContratoCreado,
}) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [vehiculoId, setVehiculoId] = useState("");
  const [tipo, setTipo] = useState<"A" | "B" | "C">("A");
  const [fecha, setFecha] = useState<DateValue | null>(null);
  const [comision, setComision] = useState("");
  const [montoServicioInicial, setMontoServicioInicial] = useState("");
  const [modalHeight, setModalHeight] = useState<string>("100dvh");

  const clienteSeleccionado = clientes.find((c) => c.id === clienteId);

  const limpiarFormulario = () => {
    setClienteId("");
    setVehiculoId("");
    setTipo("A");
    setFecha(null);
    setComision("");
    setMontoServicioInicial("");
  };

  useEffect(() => {
    if (!isOpen) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${prod_url}/clientes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClientes(res.data.clientes || res.data))
      .catch((err) => console.error("Error cargando clientes", err));
  }, [isOpen]);

  useEffect(() => {
    if (tipo === "C") setMontoServicioInicial("");
  }, [tipo]);

  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        setModalHeight(`${viewportHeight - 60}px`);
      }
    };

    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateHeight);
      window.visualViewport.addEventListener("scroll", updateHeight);
    }

    updateHeight();

    return () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
        window.visualViewport.removeEventListener("scroll", updateHeight);
      }
    };
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    setTimeout(() => {
      input.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      window.scrollBy(0, -30);
    }, 300);
  };

  const formatearFecha = (fecha: DateValue): string => {
    const yyyy = fecha.year;
    const mm = String(fecha.month).padStart(2, "0");
    const dd = String(fecha.day).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async () => {
    if (!fecha) {
      toast.error("Selecciona una fecha válida");
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      tipo,
      clienteId,
      vehiculoId,
      porcentajeComision: Number(comision),
      fechaContrato: formatearFecha(fecha),
      montoServicioInicial: tipo === "C" ? 0 : Number(montoServicioInicial),
    };

    try {
      await axios.post(`${prod_url}/contratos`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Contrato creado con éxito");
      limpiarFormulario();
      onContratoCreado();
      onClose();
    } catch (error) {
      console.error("Error al crear contrato", error);
      toast.error("Error al crear contrato");
    }
  };

  const handlePreview = async () => {
    if (!fecha || !clienteId || !vehiculoId) {
      toast.error("Completa todos los campos antes de previsualizar");
      return;
    }

    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams({
      tipo,
      clienteId,
      vehiculoId,
      porcentajeComision: comision,
      fechaContrato: formatearFecha(fecha),
      montoServicioInicial: tipo === "C" ? "0" : montoServicioInicial,
    });

    try {
      const response = await axios.get(
        `${prod_url}/contratos/pdf-preview?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contrato-preview.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error generando preview", err);
      toast.error("No se pudo generar el PDF");
    }
  };

  const handleClose = () => {
    limpiarFormulario();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="center">
      <ModalContent
  className="flex flex-col transition-all duration-300 ease-in-out w-full lg:w-[600px] lg:h-auto"
  style={{ height: typeof window !== "undefined" && window.innerWidth < 1024 ? modalHeight : undefined }}>
        <ModalHeader>Crear Contrato</ModalHeader>
        <ModalBody
  className="overflow-y-auto px-2 max-h-screen"
  style={{ WebkitOverflowScrolling: "touch" }}
>
          <Select
            label="Cliente"
            selectedKeys={clienteId ? [clienteId] : []}
            onSelectionChange={(keys) => setClienteId(Array.from(keys)[0] as string)}
          >
            {clientes.map((c) => (
              <SelectItem key={c.id}>{`${c.nombre} ${c.apellido}`}</SelectItem>
            ))}
          </Select>

          <Select
            label="Vehículo"
            selectedKeys={vehiculoId ? [vehiculoId] : []}
            onSelectionChange={(keys) => setVehiculoId(Array.from(keys)[0] as string)}
            isDisabled={!clienteId}
          >
            {(clienteSeleccionado?.vehiculos || []).map((v) => (
              <SelectItem key={v.id}>{`${v.modelo} (${v.year})`}</SelectItem>
            ))}
          </Select>

          <Select
            label="Tipo de contrato"
            selectedKeys={[tipo]}
            onSelectionChange={(keys) => setTipo(Array.from(keys)[0] as "A" | "B" | "C")}
          >
            <SelectItem key="A">Servicio de Detailling</SelectItem>
            <SelectItem key="B">Servicio de Lavado</SelectItem>
            <SelectItem key="C">Simple</SelectItem>
          </Select>

          <DatePicker
            label="Fecha del contrato"
            value={fecha ?? undefined}
            onChange={setFecha}
            granularity="day"
            className="w-full"
            showMonthAndYearPickers
          />

          {fecha && (
            <p className="text-sm text-gray-500">
              Fecha seleccionada: {format(new Date(fecha.year, fecha.month - 1, fecha.day), 'dd/MM/yyyy')}
            </p>
          )}

          <Input
            label="Porcentaje de comisión"
            type="number"
            value={comision}
            onChange={(e) => setComision(e.target.value)}
            onFocus={handleFocus}
          />

          <Input
            label="Monto del servicio inicial"
            type="number"
            value={montoServicioInicial}
            onChange={(e) => setMontoServicioInicial(e.target.value)}
            isDisabled={tipo === "C"}
            onFocus={handleFocus}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={handleClose}>Cancelar</Button>
          <Button color="default" onPress={handlePreview}>Previsualizar</Button>
          <Button color="primary" onPress={handleSubmit}>Crear contrato</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CrearContratoModal;
