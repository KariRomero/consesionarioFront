'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { fetchCarById } from '@/redux/slices/carsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import axios from 'axios';
import { prod_url } from '@/utils/routes';
import { FormVehiculoUpdateType } from '@/types/types';
import toast from 'react-hot-toast';

type Moneda = 'ARS' | 'USD';

export default function EditVehiculoPage() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { car, loading } = useSelector((state: RootState) => state.cars);

  const [selectedImage, setSelectedImage] = useState(0);
  const [tipos, setTipos] = useState<{ id: string; nombre: string }[]>([]);
  const [brands, setBrands] = useState<{ id: string; nombre: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagenSeleccionadaParaEliminar, setImagenSeleccionadaParaEliminar] = useState<string | null>(null);
  const [imagenesNuevas, setImagenesNuevas] = useState<File[]>([]);

  const [formData, setFormData] = useState<FormVehiculoUpdateType>({
    modelo: '', year: '', descripcion: '',   descripcion2: '', // 👈 nuevo
    precio: '', transmision: '',
    combustible: '', kilometraje: '', tipoId: '', brandId: '',
    moneda: 'ARS', vendido: false, ubicacion: '',   destacado: false, // 👈 nuevo

  });

  useEffect(() => { if (id) dispatch(fetchCarById(id as string)); }, [dispatch, id]);

  useEffect(() => {
    if (car) {
      setFormData({
        modelo: car.modelo || '', year: String(car.year || ''), descripcion: car.descripcion || '',    descripcion2: car.descripcion2 || '', // 👈 nuevo

        precio: String(car.precio || ''), transmision: car.transmision || '', combustible: car.combustible || '',
        kilometraje: String(car.kilometraje || ''), tipoId: car.tipoId || '', brandId: car.brandId || '',
        moneda: car.moneda as Moneda || 'ARS', vendido: car.vendido || false,     destacado: car.destacado || false, // 👈 nuevo
        ubicacion: car.ubicacion || '',
      });
    }
  }, [car]);

  useEffect(() => {
    axios.get(`${prod_url}/tipos`).then(res => setTipos(res.data)).catch(err => console.error('Error al cargar tipos', err));
    axios.get(`${prod_url}/brands`).then(res => setBrands(res.data.brands)).catch(err => console.error('Error al cargar marcas', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNuevaImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const disponibles = 5 - (car?.imagenes?.length || 0);
    const seleccionadas = Array.from(files).slice(0, disponibles);
    setImagenesNuevas(seleccionadas);
  };

  const confirmarEliminar = (url: string) => {
    setImagenSeleccionadaParaEliminar(url);
    setModalVisible(true);
  };

  const confirmarAccionEliminar = async () => {
    if (!imagenSeleccionadaParaEliminar || !id) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${prod_url}/vehiculos/${id}/imagenes-por-url`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { urls: [imagenSeleccionadaParaEliminar] },
        paramsSerializer: (params) => new URLSearchParams(params.urls.map((u: string) => ['urls', u])).toString(),
      });
      toast.success('Imagen eliminada correctamente');
      setModalVisible(false);
      setImagenSeleccionadaParaEliminar(null);
      dispatch(fetchCarById(id as string));
    } catch (err) {
      console.error(err);
      toast.error('Error al eliminar la imagen');
    }
  };

  const cancelarEliminar = () => {
    setModalVisible(false);
    setImagenSeleccionadaParaEliminar(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();
    const camposNumericos = ['year', 'precio', 'kilometraje'];
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formDataToSend.append(key, camposNumericos.includes(key) ? String(Number(value)) : String(value));
      }
    });
    imagenesNuevas.forEach((file) => {
      formDataToSend.append('imagenes', file);
    });
    try {
      await axios.put(`${prod_url}/vehiculos/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Vehículo actualizado correctamente');
      router.push('/admin/vehiculos');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el vehículo');
    }
  };

  if (loading || !car) return <p className="p-10">Cargando datos...</p>;

  return (
    <section className="w-full bg-white mt-96 pt-28 px-6">
      <h1 className="text-3xl font-bold mb-6">Editar Vehículo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="w-full mb-4 relative" style={{ width: '100%', height: '470px' }}>
            <Image
              src={car.imagenes?.[selectedImage]?.url || '/no-image.jpg'}
              alt={car.modelo}
              width={600}
              height={470}
              className="rounded-lg object-cover w-full h-full"
            />
            <button type="button" onClick={() => setSelectedImage(i => (i === 0 ? (car.imagenes?.length || 1) - 1 : i - 1))} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-4 bg-gray-800 text-white rounded-full">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button type="button" onClick={() => setSelectedImage(i => (i === (car.imagenes?.length || 1) - 1 ? 0 : i + 1))} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 bg-gray-800 text-white rounded-full">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="flex overflow-x-auto space-x-4">
            {car.imagenes?.map((img, index) => (
              <div key={index} className="relative">
                <img src={img.url} alt={`img-${index}`} className="w-20 h-20 object-cover rounded border-2" />
                <button type="button" onClick={() => confirmarEliminar(img.url)} className="text-xs text-center mt-1 text-red-600 hover:underline w-full">
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {(car.imagenes?.length || 0) < 5 && (
            <div className="mt-4">
<label className="block font-semibold">
  Agregar imágenes ({5 - (car.imagenes?.length ?? 0)} restantes)
</label>              <input
                type="file"
                name="imagenes"
                accept="image/*"
                multiple
                onChange={handleNuevaImagen}
                className="mt-1"
                max={5 - (car.imagenes?.length ?? 0)}              />
            </div>
          )}
        </div>

        <div className="lg:w-1/2">
          <div className="grid grid-cols-1 gap-4">
            {['modelo', 'year', 'descripcion', 'precio', 'kilometraje', 'ubicacion', 'transmision', 'combustible'].map((key) => (
              <div key={key}>
                <label className="block font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof typeof formData] as string}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
            <div>
              <label className="block font-semibold">Moneda</label>
              <select name="moneda" value={formData.moneda} onChange={handleChange} className="w-full border p-2 rounded" required>
                <option disabled value="">Seleccionar moneda</option>
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Tipo de Vehículo</label>
              <select name="tipoId" value={formData.tipoId} onChange={handleChange} className="w-full border p-2 rounded" required>
                <option disabled value="">Seleccionar tipo</option>
                {tipos.map((tipo) => (<option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>))}
              </select>
            </div>
            {/* 🟡 Descripción extendida */}
<div>
  <label className="block font-semibold">Descripción extendida</label>
  <textarea
    name="descripcion2"
    value={formData.descripcion2}
    onChange={handleChange}
    rows={4}
    placeholder="Descripción más detallada..."
    className="w-full border p-2 rounded"
  />
</div>
            <div>
              <label className="block font-semibold">Marca</label>
              <select name="brandId" value={formData.brandId} onChange={handleChange} className="w-full border p-2 rounded" required>
                <option disabled value="">Seleccionar marca</option>
                {brands.map((brand) => (<option key={brand.id} value={brand.id}>{brand.nombre}</option>))}
              </select>
            </div>
            <div>
              <label className="block font-semibold">¿Vendido?</label>
              <input type="checkbox" name="vendido" checked={formData.vendido} onChange={handleChange} />
            </div>
          </div>
          <div>
  <label className="block font-semibold">¿Destacado?</label>
  <input
    type="checkbox"
    name="destacado"
    checked={formData.destacado}
    onChange={handleChange}
  />
</div>
          <button type="submit" className="mt-6 bg-green-600 text-black px-6 py-3 rounded hover:bg-green-700 transition">
            Guardar cambios
          </button>
        </div>
      </form>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm text-center shadow-lg">
            <h2 className="text-lg font-bold mb-4">¿Estás seguro que querés eliminar esta imagen?</h2>
            <img src={imagenSeleccionadaParaEliminar || ''} alt="preview" className="w-40 h-40 object-cover mx-auto mb-4 rounded" />
            <div className="flex justify-center gap-4">
              <button onClick={confirmarAccionEliminar} className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-700">Eliminar</button>
              <button onClick={cancelarEliminar} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}