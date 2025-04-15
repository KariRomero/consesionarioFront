'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CrearVehiculoPage() {
  const router = useRouter();

  const [tipos, setTipos] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    modelo: '',
    descripcion: '',
    year: '',
    precio: '',
    transmision: '',
    combustible: '',
    kilometraje: '',
    moneda: '',
    vendido: false,
    ubicacion: '',
    tipoId: '',
    brandId: '',
  });

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tipos`).then(res => setTipos(res.data));
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`).then(res => setBrands(res.data.brands));
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
          form.append(key, String(Number(value))); // 🔢 fuerza número
        } else {
          form.append(key, String(value));
        }
      }
    });

    const filesArray = imagenes ? Array.from(imagenes) : [];
    filesArray.forEach((file) => {
      form.append('imagenes', file);
    });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/vehiculos`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Vehículo creado con éxito');
      router.push('/admin/vehiculos'); // ✅ redirección
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el vehículo');
    }
  };

  return (
    <section className="w-full bg-white mt-20 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crear Vehículo</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {['modelo', 'descripcion', 'year', 'precio', 'kilometraje', 'transmision', 'combustible', 'ubicacion'].map(field => (
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

        <select name="moneda" value={formData.moneda} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Seleccionar moneda</option>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
        </select>

        <select name="tipoId" value={formData.tipoId} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Seleccionar tipo</option>
          {tipos.map((tipo: any) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>

        <select name="brandId" value={formData.brandId} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Seleccionar marca</option>
          {brands.map((brand: any) => (
            <option key={brand.id} value={brand.id}>{brand.nombre}</option>
          ))}
        </select>

        <div>
          <label className="block font-semibold">¿Vendido?</label>
          <input
            type="checkbox"
            name="vendido"
            checked={formData.vendido}
            onChange={handleChange}
          />
        </div>

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