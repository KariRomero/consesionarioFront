
export interface Vehiculo {
    id: number;
    modelo: string;
    year: string;
    descripcion: string;
    precio: string;
    transmision: string;
    combustible: string;
    kilometraje: string;
    tipoId?: string;
    brandId?: string;
    brand?: { nombre: string }; // si usás esto en cards
    tipo?: { nombre: string };  // opcional si se usa
    imagenes: { url: string }[];
    vendido?: boolean;
    ubicacion?: string;
    moneda?: 'ARS' | 'USD'; // 👈 agregá esta línea
  }


  export interface FormVehiculoUpdateType {
    modelo: string;
    year: string;            // string en el form, lo convertimos al enviar
    descripcion: string;
    precio: string;
    transmision?: string;
    combustible?: string;
    kilometraje?: string;
    tipoId: string;
    brandId: string;
    moneda: 'ARS' | 'USD';
    vendido: boolean;
    ubicacion?: string;
    imagenesEliminar?: string[];
  }