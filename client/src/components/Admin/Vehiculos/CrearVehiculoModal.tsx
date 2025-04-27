'use client';

import React, { useState, useEffect } from 'react';
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
} from '@nextui-org/react';
import { prod_url } from '@/utils/routes';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CrearVehiculoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehiculoCreado: () => void;
}

const CrearVehiculoModal: React.FC<CrearVehiculoModalProps> = ({ isOpen, onClose, onVehiculoCreado }) => {
  const [tipos, setTipos] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    modelo: '',
    descripcion: '',
    descripcion2: '',
    year: '',
    precio: '',
    kilometraje: '',
    transmision: '',
    combustible: '',
    ubicacion: '',
    numeroChasis: '',
    dominio: '',
    moneda: '',
    tipoId: '',
    brandId: '',
    clienteId: '',
    publicado: false,
    vendido: false,
    destacado: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    const token = localStorage.getItem('token');
    Promise.all([
      axios.get(`${prod_url}/tipos`),
      axios.get(`${prod_url}/brands`),
      axios.get(`${prod_url}/clientes`, { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(([tiposRes, brandsRes, clientesRes]) => {
        setTipos(tiposRes.data);
        setBrands(brandsRes.data.brands);
        setClientes(clientesRes.data.clientes || clientesRes.data);
      })
      .catch(console.error);
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const form = new FormData();
    const camposNumericos = ['year', 'precio', 'kilometraje'];

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '') {
        if (camposNumericos.includes(key)) {
          form.append(key, String(Number(value)));
        } else {
          form.append(key, String(value));
        }
      }
    });

    const filesArray = imagenes ? Array.from(imagenes) : [];
    filesArray.forEach(file => form.append('imagenes', file));

    try {
      await axios.post(`${prod_url}/vehiculos`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Vehículo creado con éxito');
      onVehiculoCreado();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el vehículo');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top"
      className="bg-background text-foreground w-full max-w-2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="text-xl font-bold">Crear Vehículo</ModalHeader>

            <ModalBody className="overflow-y-auto max-h-[500px] md:max-h-[75vh] space-y-4 px-2">              <Select
                label="Tipo"
                selectedKeys={[formData.tipoId]}
                items={tipos}
                onChange={(e) => handleSelectChange('tipoId', e.target.value)}
                isRequired
              >
                {(tipo) => (
                  <SelectItem key={tipo.id}>{tipo.nombre}</SelectItem>
                )}
              </Select>
              <Select
                label="Marca"
                selectedKeys={[formData.brandId]}
                items={brands}
                onChange={(e) => handleSelectChange('brandId', e.target.value)}
                isRequired
              >
                {(brand) => (
                  <SelectItem key={brand.id}>{brand.nombre}</SelectItem>
                )}
              </Select>
              <Input name="modelo" label="Modelo" value={formData.modelo} onChange={handleChange} isRequired />
              <Input name="year" label="Año" type="number" value={formData.year} onChange={handleChange} isRequired />
              <Input name="dominio" label="Dominio" value={formData.dominio} onChange={handleChange} />
              <Input name="numeroChasis" label="Número de Chasis" value={formData.numeroChasis} onChange={handleChange} />
              <Input name="transmision" label="Transmisión" value={formData.transmision} onChange={handleChange} />
              <Input name="kilometraje" label="Kilometraje" type="number" value={formData.kilometraje} onChange={handleChange} />
              <Input name="combustible" label="Combustible" value={formData.combustible} onChange={handleChange} />
              <Input name="ubicacion" label="Ubicación" value={formData.ubicacion} onChange={handleChange} />
              <Input name="precio" label="Precio" type="number" value={formData.precio} onChange={handleChange} isRequired />

              <Select
                label="Moneda"
                selectedKeys={[formData.moneda]}
                onChange={(e) => handleSelectChange('moneda', e.target.value)}
                isRequired
              >
                <SelectItem key="ARS">ARS</SelectItem>
                <SelectItem key="USD">USD</SelectItem>
              </Select>






<Select
  label="Cliente (opcional)"
  selectedKeys={formData.clienteId ? new Set([formData.clienteId]) : new Set([])}
  items={clientes}
  onSelectionChange={(keys) => {
    const selected = Array.from(keys)[0] as string;
    handleSelectChange('clienteId', selected);
  }}
  classNames={{ trigger: "text-black" }}
>
  {(cliente) => <SelectItem key={cliente.id} textValue={`${cliente.nombre} ${cliente.apellido}`}>
  {cliente.nombre} {cliente.apellido}
</SelectItem>}
</Select>
                <Input name="descripcion" label="Descripción corta" value={formData.descripcion} onChange={handleChange} />

              <Textarea name="descripcion2" label="Descripción extendida" value={formData.descripcion2} onChange={handleChange} />

              <div className="flex gap-4">
  <Checkbox
    name="publicado"
    isSelected={formData.publicado}
    onValueChange={(checked) =>
      setFormData((prev) => ({ ...prev, publicado: checked }))
    }
  >
    Publicado
  </Checkbox>

  <Checkbox
    name="vendido"
    isSelected={formData.vendido}
    onValueChange={(checked) =>
      setFormData((prev) => ({ ...prev, vendido: checked }))
    }
  >
    Vendido
  </Checkbox>

  <Checkbox
    name="destacado"
    isSelected={formData.destacado}
    onValueChange={(checked) =>
      setFormData((prev) => ({ ...prev, destacado: checked }))
    }
  >
    Destacado
  </Checkbox>
</div>

              <div className="flex flex-col gap-2">
  <label className="font-semibold mb-1">Imágenes</label>

  <label className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center transition text-sm max-w-[200px]">
    Seleccionar imágenes
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={(e) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        
        if (selectedFiles.length > 5) {
          toast.error('Máximo 5 imágenes permitidas');
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
        {imagenes.length} imagen{imagenes.length > 1 ? 'es' : ''} seleccionada{imagenes.length > 1 ? 's' : ''}.
        {imagenes.length < 5 && ` Te quedan ${5 - imagenes.length} por subir.`}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from(imagenes).map((file, index) => (
          <div key={index} className="w-20 h-20 rounded overflow-hidden border">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </>
  )}
</div>
            </ModalBody>

            <ModalFooter>
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