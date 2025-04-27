"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchCarById } from "@/redux/slices/carsSlice";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { prod_url } from "@/utils/routes";
import type { FormVehiculoUpdateType, Imagenes } from "@/types/types";

interface EditarVehiculoModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehiculoId: string;
  onVehiculoActualizado: () => void; // 🔥 nueva prop

}

const EditarVehiculoModal: React.FC<EditarVehiculoModalProps> = ({
  isOpen,
  onClose,
  vehiculoId,
  onVehiculoActualizado, // 🎯 Faltaba traerlo acá
}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { car, loading } = useSelector((state: RootState) => state.cars);

  const [formData, setFormData] = useState<FormVehiculoUpdateType>({
    modelo: "",
    year: "",
    descripcion: "",
    descripcion2: "",
    precio: "",
    transmision: "",
    combustible: "",
    kilometraje: "",
    tipoId: "",
    brandId: "",
    moneda: "ARS",
    vendido: false,
    ubicacion: "",
    destacado: false,
    publicado: false,
    numeroChasis: "",
    dominio: "",
    clienteId: "",
  });

  const [tipos, setTipos] = useState<{ id: string; nombre: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; nombre: string }[]>([]);
  const [clientes, setClientes] = useState<
    { id: string; nombre: string; apellido: string }[]
  >([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imagenesNuevas, setImagenesNuevas] = useState<File[]>([]);
  const [imagenSeleccionadaParaEliminar, setImagenSeleccionadaParaEliminar] =
    useState<string | null>(null);
  const [confirmarEliminarModal, setConfirmarEliminarModal] = useState(false);
  const [verTodasLasImagenes, setVerTodasLasImagenes] = useState(false);

  useEffect(() => {
    if (vehiculoId) dispatch(fetchCarById(vehiculoId));
  }, [dispatch, vehiculoId]);

  useEffect(() => {
    if (car) {
      setFormData({
        modelo: car.modelo || "",
        year: String(car.year || ""),
        descripcion: car.descripcion || "",
        descripcion2: car.descripcion2 || "",
        precio: String(car.precio || ""),
        transmision: car.transmision || "",
        combustible: car.combustible || "",
        kilometraje: String(car.kilometraje || ""),
        tipoId: car.tipoId || "",
        brandId: car.brandId || "",
        moneda: (car.moneda as "ARS" | "USD") || "ARS",
        vendido: car.vendido || false,
        destacado: car.destacado || false,
        ubicacion: car.ubicacion || "",
        publicado: car.publicado || false,
        numeroChasis: car.numeroChasis || "",
        dominio: car.dominio || "",
        clienteId: car.clienteId || "",
      });
    }
  }, [car]);

  useEffect(() => {
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
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNuevaImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
  
    const selectedFiles = Array.from(e.target.files);
  
    const disponibles = 5 - (car?.imagenes?.length || 0);
    if (selectedFiles.length > disponibles) {
      toast.error(`Máximo ${disponibles} imágenes permitidas`);
      return;
    }
  
    setImagenesNuevas(selectedFiles);
  };

  const confirmarEliminar = (url: string) => {
    setImagenSeleccionadaParaEliminar(url);
    setConfirmarEliminarModal(true);
  };

  const eliminarImagen = async () => {
    if (!vehiculoId || !imagenSeleccionadaParaEliminar) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${prod_url}/vehiculos/${vehiculoId}/imagenes-por-url`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { urls: [imagenSeleccionadaParaEliminar] },
          paramsSerializer: (params) =>
            new URLSearchParams(
              params.urls.map((u: string) => ["urls", u])
            ).toString(),
        }
      );
      toast.success("Imagen eliminada correctamente");
      dispatch(fetchCarById(vehiculoId));
      setSelectedImage(0);
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar imagen");
    } finally {
      setConfirmarEliminarModal(false);
      setImagenSeleccionadaParaEliminar(null);
    }
  };

  const eliminarVehiculo = async () => {
    if (!vehiculoId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${prod_url}/vehiculos/${vehiculoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Vehículo eliminado");
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar vehículo");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const form = new FormData();
    const camposNumericos = ["year", "precio", "kilometraje"];

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (camposNumericos.includes(key)) {
          form.append(key, value === "" ? "" : String(Number(value)));
        } else {
          form.append(key, String(value));
        }
      }
    });

    imagenesNuevas.forEach((file) => form.append("imagenes", file));

    
      try {
        await axios.put(`${prod_url}/vehiculos/${vehiculoId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Vehículo actualizado correctamente");
        onClose();
        onVehiculoActualizado(); // 🔥 llamamos al refresh
      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar vehículo");
      }
  };

  if (loading || !car) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="center"
        className="bg-background text-foreground h-[500px] w-full max-w-[800px]"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(close) => (
            <>
            <ModalHeader className="flex justify-between items-center">
  <span className="text-xl font-bold">Editar Vehículo</span>
  <Button 
    color="danger" 
    size="sm" 
    onClick={eliminarVehiculo}
    className="mr-4" // 🔥 agregado
  >
    Eliminar Vehículo
  </Button>
</ModalHeader>
<ModalBody className="overflow-y-auto max-h-[80dvh] md:max-h-[75vh] space-y-4 px-2">
               {!verTodasLasImagenes ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-center">
                      <Image
                        src={
                          car?.imagenes?.[selectedImage]?.url || "/no-image.jpg"
                        }
                        alt="Preview"
                        width={300}
                        height={200}
                        className="rounded-lg object-contain"
                      />
                    </div>

                    {Array.isArray(car?.imagenes) &&
                      car.imagenes.length > 0 && (
                        <div className="flex overflow-x-auto space-x-4 mt-2">
                          {car.imagenes.map((img: any, idx: number) => (
                            <div key={idx} className="relative">
                              <img
                                src={img.url || "/placeholder.svg"}
                                alt={`img-${idx}`}
                                className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                                  selectedImage === idx
                                    ? "border-4 border-primary"
                                    : ""
                                }`}
                                onClick={() => setSelectedImage(idx)}
                              />
                              <button
                                type="button"
                                onClick={() => confirmarEliminar(img.url)}
                                className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1"
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setVerTodasLasImagenes(true)}
                    >
                      Ver todas las imágenes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {car.imagenes?.map((img: Imagenes, index: number) => (
                        <div key={index} className="relative">
                          <Image
                            src={img.url || "/placeholder.svg"}
                            alt={`img-${index}`}
                            width={200}
                            height={150}
                            className="object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => confirmarEliminar(img.url)}
                            className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full p-1"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setVerTodasLasImagenes(false)}
                    >
                      Ver imagen principal
                    </Button>
                  </div>
                )}

{Array.isArray(car?.imagenes) && car.imagenes.length < 5 && (
  <div className="flex flex-col gap-2">
    <label className="font-semibold mb-1">Agregar imágenes</label>

    {imagenesNuevas.length > 0 && (
      <>
        <div className="flex flex-wrap gap-2 mt-2">
          {imagenesNuevas.map((file, index) => (
            <div key={index} className="w-20 h-20 rounded overflow-hidden border">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {imagenesNuevas.length} imagen{imagenesNuevas.length > 1 ? 'es' : ''} seleccionada{imagenesNuevas.length > 1 ? 's' : ''}.
          {imagenesNuevas.length < 5 && ` Te quedan ${5 - (car?.imagenes?.length || 0) - imagenesNuevas.length} por subir.`}
        </p>
      </>
    )}

    <label className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center transition text-sm max-w-[200px] mt-2">
      Seleccionar imágenes
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleNuevaImagen}
        className="hidden"
      />
    </label>
  </div>
)}
<Select
                  label="Tipo"
                  selectedKeys={formData.tipoId ? new Set([formData.tipoId]) : new Set()}
                  onSelectionChange={(keys) => handleSelectChange("tipoId", Array.from(keys)[0])}
                >
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo.id}>{tipo.nombre}</SelectItem>
                  ))}
                </Select>

                <Select
                  label="Marca"
                  selectedKeys={formData.brandId ? new Set([formData.brandId]) : new Set()}
                  onSelectionChange={(keys) => handleSelectChange("brandId", Array.from(keys)[0])}
                >
                  {brands.map((brand) => (
                    <SelectItem key={brand.id}>{brand.nombre}</SelectItem>
                  ))}
                </Select>

                <Input name="modelo" label="Modelo" value={formData.modelo} onChange={handleChange} />
                <Input name="year" label="Año" value={formData.year} onChange={handleChange} />
                <Input name="dominio" label="Dominio" value={formData.dominio} onChange={handleChange} />
                <Input name="numeroChasis" label="Número de chasis" value={formData.numeroChasis} onChange={handleChange} />
                <Input name="transmision" label="Transmisión" value={formData.transmision} onChange={handleChange} />
                <Input name="kilometraje" label="Kilometraje" value={formData.kilometraje} onChange={handleChange} />
                <Input name="combustible" label="Combustible" value={formData.combustible} onChange={handleChange} />
                <Input name="ubicacion" label="Ubicación" value={formData.ubicacion} onChange={handleChange} />
                <Input name="precio" label="Precio" value={formData.precio} onChange={handleChange} />

                <Select
                  label="Moneda"
                  selectedKeys={formData.moneda ? new Set([formData.moneda]) : new Set()}
                  onSelectionChange={(keys) => handleSelectChange("moneda", Array.from(keys)[0])}
                >
                  <SelectItem key="ARS">ARS</SelectItem>
                  <SelectItem key="USD">USD</SelectItem>
                </Select>
                <Select
  label="Cliente (opcional)"
  selectedKeys={formData.clienteId ? new Set([formData.clienteId]) : new Set([])}
  items={[{ id: "", nombre: "Sin cliente asignado", apellido: "" }, ...clientes]}
  onSelectionChange={(keys) => {
    const selected = Array.from(keys)[0] as string;
    handleSelectChange("clienteId", selected);
  }}
  classNames={{ trigger: "text-black" }}
>
  {(cliente) => (
    <SelectItem key={cliente.id} textValue={`${cliente.nombre} ${cliente.apellido}`}>
      {cliente.nombre} {cliente.apellido}
    </SelectItem>
  )}
</Select>

                <Textarea name="descripcion" label="Descripción corta" value={formData.descripcion} onChange={handleChange} />
                <Textarea name="descripcion2" label="Descripción extendida" value={formData.descripcion2} onChange={handleChange} />

                <div className="flex gap-4">
                  <Checkbox name="publicado" isSelected={formData.publicado} onValueChange={(checked) => handleSelectChange("publicado", checked)}>
                    Publicado
                  </Checkbox>
                  <Checkbox name="vendido" isSelected={formData.vendido} onValueChange={(checked) => handleSelectChange("vendido", checked)}>
                    Vendido
                  </Checkbox>
                  <Checkbox name="destacado" isSelected={formData.destacado} onValueChange={(checked) => handleSelectChange("destacado", checked)}>
                    Destacado
                  </Checkbox>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={close}>Cancelar</Button>
                <Button color="primary" onClick={handleSubmit}>Guardar Cambios</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal de confirmación para eliminar imagen */}
      <Modal
        isOpen={confirmarEliminarModal}
        onOpenChange={() => setConfirmarEliminarModal(false)}
        placement="center"
        className="bg-background text-foreground"
      >
        <ModalContent>
          {(closeConfirm) => (
            <>
              <ModalHeader className="text-center">
                <span className="text-lg font-bold">
                  ¿Eliminar esta imagen?
                </span>
              </ModalHeader>
              <ModalBody className="flex justify-center">
                {imagenSeleccionadaParaEliminar && (
                  <img
                    src={imagenSeleccionadaParaEliminar || "/placeholder.svg"}
                    alt="preview"
                    className="w-40 h-40 object-cover mx-auto rounded"
                  />
                )}
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" onClick={eliminarImagen}>
                  Eliminar
                </Button>
                <Button variant="light" onClick={closeConfirm}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditarVehiculoModal;
