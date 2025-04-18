'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { prod_url } from '@/utils/routes';

export default function CrearVehiculoPage() {
  const router = useRouter();

  const [tipos, setTipos] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    modelo: '',
    descripcion: '',
    descripcion2: '',
    year: '',
    precio: '',
    transmision: '',
    combustible: '',
    kilometraje: '',
    moneda: '',
    vendido: false,
    destacado: false,
    publicado: false,
    ubicacion: '',
    tipoId: '',
    brandId: '',
    numeroChasis: '',
    dominio: '',
    clienteId: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${prod_url}/tipos`).then(res => setTipos(res.data));
    axios.get(`${prod_url}/brands`).then(res => setBrands(res.data.brands));
    axios.get(`${prod_url}/clientes`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setClientes(res.data.clientes || res.data)).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      router.push('/admin/vehiculos');
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el vehículo');
    }
  };

  return (
    <section className="w-full bg-white mt-20 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crear Vehículo</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {['modelo', 'descripcion', 'year', 'precio', 'kilometraje', 'transmision', 'combustible', 'ubicacion', 'numeroChasis', 'dominio'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
          />
        ))}

        {/* Moneda */}
        <select name="moneda" value={formData.moneda} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Seleccionar moneda</option>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
        </select>

        {/* Tipo */}
        <select name="tipoId" value={formData.tipoId} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Seleccionar tipo</option>
          {tipos.map((tipo: any) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>

        {/* Marca */}
        <select name="brandId" value={formData.brandId} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Seleccionar marca</option>
          {brands.map((brand: any) => (
            <option key={brand.id} value={brand.id}>{brand.nombre}</option>
          ))}
        </select>

        {/* Cliente */}
        <select name="clienteId" value={formData.clienteId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Sin cliente asignado</option>
          {clientes.map((cliente: any) => (
            <option key={cliente.id} value={cliente.id}>{cliente.nombre} {cliente.apellido}</option>
          ))}
        </select>

        {/* Descripción extendida */}
        <div>
          <label className="block font-semibold mb-1">Descripción extendida</label>
          <textarea
            name="descripcion2"
            value={formData.descripcion2}
            onChange={handleChange}
            rows={4}
            placeholder="Descripción más detallada del vehículo..."
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Publicado, Vendido, Destacado */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 font-semibold">
            <input type="checkbox" name="publicado" checked={formData.publicado} onChange={handleChange} />
            ¿Publicado?
          </label>
          <label className="flex items-center gap-2 font-semibold">
            <input type="checkbox" name="vendido" checked={formData.vendido} onChange={handleChange} />
            ¿Vendido?
          </label>
          <label className="flex items-center gap-2 font-semibold">
            <input type="checkbox" name="destacado" checked={formData.destacado} onChange={handleChange} />
            ¿Destacado?
          </label>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block font-semibold">Imágenes</label>
          <input type="file" multiple onChange={(e) => setImagenes(e.target.files)} />
        </div>

        <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700">
          Crear vehículo
        </button>
      </form>
    </section>
  );
}