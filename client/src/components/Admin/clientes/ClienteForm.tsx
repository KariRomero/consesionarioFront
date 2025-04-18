"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { prod_url } from "@/utils/routes";

interface Vehiculo {
  id: string;
  modelo: string;
  year: number;
  dominio?: string; // ✅ nuevo campo

}

export default function ClienteForm() {
  const router = useRouter();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    direccion: "",
    vehiculoIds: [] as string[],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔑 Token actual:", token); // 👈 agregalo acá

    const fetchVehiculos = async () => {
      try {
        const res = await axios.get(`${prod_url}/vehiculos/findAll/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const disponibles = res.data.vehiculos.filter((v: any) => !v.clienteId);
        setVehiculos(disponibles);
      } catch (err) {
        console.error("🔴 Error al cargar vehículos:", err);
        toast.error("Error al cargar vehículos");
      }
    };

    fetchVehiculos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehiculoToggle = (id: string) => {
    setForm((prev) => {
      const already = prev.vehiculoIds.includes(id);
      return {
        ...prev,
        vehiculoIds: already
          ? prev.vehiculoIds.filter((v) => v !== id)
          : [...prev.vehiculoIds, id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${prod_url}/clientes`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Cliente creado con éxito");
      router.push("/admin/clientes");
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      toast.error(msg || "Error al crear cliente");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="direccion"
          placeholder="Dirección (opcional)"
          value={form.direccion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div>
      <label className="block font-semibold mb-2">Vehículos sin cliente</label>
<div className="space-y-2 max-h-60 overflow-y-auto border p-2 rounded">
  {vehiculos.map((v) => (
    <div key={v.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={form.vehiculoIds.includes(v.id)}
        onChange={() => handleVehiculoToggle(v.id)}
      />
      <span className="whitespace-nowrap">
        {v.modelo} ({v.year}){v.dominio ? ` - Dominio: ${v.dominio.toUpperCase()}` : ''}
      </span>
    </div>
  ))}
</div>
      </div>

      {form.vehiculoIds.length > 0 && (
        <div>
          <label className="block font-semibold mt-4 mb-2">
            Vehículos seleccionados
          </label>
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

      <button
        type="submit"
        className="bg-blue-600 text-black px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Crear cliente
      </button>
    </form>
  );
}
