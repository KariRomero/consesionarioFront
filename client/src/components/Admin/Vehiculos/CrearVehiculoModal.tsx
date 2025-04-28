"use client";

import React, { useState, useEffect } from "react";
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
  Checkbox,
} from "@nextui-org/react";
import { prod_url } from "@/utils/routes";
import axios from "axios";
import toast from "react-hot-toast";

interface CrearVehiculoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehiculoCreado: () => void;
}

const CrearVehiculoModal: React.FC<CrearVehiculoModalProps> = ({
  isOpen,
  onClose,
  onVehiculoCreado,
}) => {
  const modalBodyRef = React.useRef<HTMLDivElement>(null);

  const [tipos, setTipos] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [modalHeight, setModalHeight] = useState<string>("100dvh");

  const [formData, setFormData] = useState({
    modelo: "",
    descripcion: "",
    descripcion2: "",
    year: "",
    precio: "",
    kilometraje: "",
    transmision: "",
    combustible: "",
    ubicacion: "",
    numeroChasis: "",
    dominio: "",
    moneda: "",
    tipoId: "",
    brandId: "",
    clienteId: "",
    publicado: false,
    vendido: false,
    destacado: false,
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target;
    setTimeout(() => {
      input.scrollIntoView({
        behavior: "smooth",
        block: "center", // ✅ volvemos a center, pero controlado
        inline: "nearest",
      });
      
      // Opcional: si todavía querés microajustar:
      window.scrollBy(0, -30); // levanta 30px más
    }, 300); // ⏳ delay más largo, para que el teclado ya esté abierto
  };
  
  


  useEffect(() => {
    if (!isOpen) return;
    const token = localStorage.getItem("token");
    Promise.all([
      axios.get(`${prod_url}/tipos`),
      axios.get(`${prod_url}/brands`),
      axios.get(`${prod_url}/clientes`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([tiposRes, brandsRes, clientesRes]) => {
        setTipos(tiposRes.data);
        setBrands(brandsRes.data.brands);
        setClientes(clientesRes.data.clientes || clientesRes.data);
      })
      .catch(console.error);
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const form = new FormData();
    const camposNumericos = ["year", "precio", "kilometraje"];

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        if (camposNumericos.includes(key)) {
          form.append(key, String(Number(value)));
        } else {
          form.append(key, String(value));
        }
      }
    });

    const filesArray = imagenes ? Array.from(imagenes) : [];
    filesArray.forEach((file) => form.append("imagenes", file));

    try {
      await axios.post(`${prod_url}/vehiculos`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Vehículo creado con éxito");
      onVehiculoCreado();
      onClose();
      
      // 🔥 limpiar datos después
      setFormData({
        modelo: "",
        descripcion: "",
        descripcion2: "",
        year: "",
        precio: "",
        kilometraje: "",
        transmision: "",
        combustible: "",
        ubicacion: "",
        numeroChasis: "",
        dominio: "",
        moneda: "",
        tipoId: "",
        brandId: "",
        clienteId: "",
        publicado: false,
        vendido: false,
        destacado: false,
      });
      setImagenes(null);
      
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el vehículo");
    }
  };


  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const newHeight = viewportHeight - 10; // le resto 10px para que no quede tocando arriba
        setModalHeight(`${newHeight}px`);
      }
    };
  
    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateHeight);
      window.visualViewport.addEventListener("scroll", updateHeight);
    }
  
    updateHeight(); // Setear al principio también
  
    return () => {
      if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
        window.visualViewport.removeEventListener("scroll", updateHeight);
      }
    };
  }, []);
  

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      className="w-full max-w-2xl h-[100dvh] overflow-hidden"
    >
<ModalContent
  className="flex flex-col transition-all duration-300 ease-in-out"
  style={{ height: modalHeight }}
>
        {(close) => (
          <>
            <ModalHeader className="text-xl font-bold">
              Crear Vehículo
            </ModalHeader>

            <ModalBody className="flex-1 overflow-y-auto px-2" style={{ WebkitOverflowScrolling: "touch", fontSize: "16px" }}>
              {/* Inputs, selects y textareas */}
              <Select label="Tipo" selectedKeys={[formData.tipoId]} items={tipos} onChange={(e) => handleSelectChange("tipoId", e.target.value)} isRequired>
                {(tipo) => <SelectItem key={tipo.id}>{tipo.nombre}</SelectItem>}
              </Select>

              <Select label="Marca" selectedKeys={[formData.brandId]} items={brands} onChange={(e) => handleSelectChange("brandId", e.target.value)} isRequired>
                {(brand) => <SelectItem key={brand.id}>{brand.nombre}</SelectItem>}
              </Select>

              <Input name="modelo" onFocus={handleFocus} label="Modelo" value={formData.modelo} onChange={handleChange} isRequired />
              <Input name="year"   onFocus={handleFocus} // 👈 le agregás esto
 label="Año" type="number" value={formData.year} onChange={handleChange} isRequired />
              <Input name="dominio" onFocus={handleFocus} label="Dominio" value={formData.dominio} onChange={handleChange} />
              <Input name="numeroChasis" onFocus={handleFocus} label="Número de Chasis" value={formData.numeroChasis} onChange={handleChange} />
              <Input name="transmision" onFocus={handleFocus} label="Transmisión" value={formData.transmision} onChange={handleChange} />
              <Input name="kilometraje" onFocus={handleFocus} label="Kilometraje" type="number" value={formData.kilometraje} onChange={handleChange} />
              <Input name="combustible" onFocus={handleFocus} label="Combustible" value={formData.combustible} onChange={handleChange} />
              <Input name="ubicacion" onFocus={handleFocus} label="Ubicación" value={formData.ubicacion} onChange={handleChange} />
              <Input name="precio" onFocus={handleFocus} label="Precio" type="number" value={formData.precio} onChange={handleChange} isRequired />

              <Select label="Moneda"  selectedKeys={[formData.moneda]} onChange={(e) => handleSelectChange("moneda", e.target.value)} isRequired>
                <SelectItem key="ARS">ARS</SelectItem>
                <SelectItem key="USD">USD</SelectItem>
              </Select>

              <Select label="Cliente (opcional)" selectedKeys={formData.clienteId ? new Set([formData.clienteId]) : new Set()} items={clientes}
                onSelectionChange={(keys) => handleSelectChange("clienteId", Array.from(keys)[0] as string)}
                classNames={{ trigger: "text-black" }}
              >
                {(cliente) => (
                  <SelectItem key={cliente.id} textValue={`${cliente.nombre} ${cliente.apellido}`}>
                    {cliente.nombre} {cliente.apellido}
                  </SelectItem>
                )}
              </Select>

              <Input name="descripcion" onFocus={handleFocus} label="Descripción corta" value={formData.descripcion} onChange={handleChange} />
              <Textarea name="descripcion2" onFocus={handleFocus} label="Descripción extendida" value={formData.descripcion2} onChange={handleChange} />

              <div className="flex gap-4">
                <Checkbox name="publicado"  isSelected={formData.publicado} onValueChange={(checked) => setFormData((prev) => ({ ...prev, publicado: checked }))}>
                  Publicado
                </Checkbox>
                <Checkbox name="vendido" isSelected={formData.vendido} onValueChange={(checked) => setFormData((prev) => ({ ...prev, vendido: checked }))}>
                  Vendido
                </Checkbox>
                <Checkbox name="destacado" isSelected={formData.destacado} onValueChange={(checked) => setFormData((prev) => ({ ...prev, destacado: checked }))}>
                  Destacado
                </Checkbox>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold mb-1">Imágenes</label>
                <label className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center transition text-sm max-w-[200px]">
                  Seleccionar imágenes
                  <input type="file" multiple accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const selectedFiles = Array.from(e.target.files);
                      if (selectedFiles.length > 5) {
                        toast.error("Máximo 5 imágenes permitidas");
                        return;
                      }
                      setImagenes(e.target.files);
                    }}
                    className="hidden"
                  />
                </label>

                {imagenes && (
                  <>
                    <p className="text-sm text-gray-600 mt-1">
                      {imagenes.length} imagen{imagenes.length > 1 ? "es" : ""} seleccionada{imagenes.length > 1 ? "s" : ""}.
                      {imagenes.length < 5 && ` Te quedan ${5 - imagenes.length} por subir.`}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.from(imagenes).map((file, index) => (
                        <div key={index} className="w-20 h-20 rounded overflow-hidden border">
                          <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="object-cover w-full h-full" />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="sticky bottom-0 bg-white p-4 shadow-md z-10">
              <Button variant="light" onPress={close} className="text-black">
                Cancelar
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Crear Vehículo
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CrearVehiculoModal;
