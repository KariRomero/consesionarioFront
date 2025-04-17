export type Brand = {
    id: string;
    nombre: string;
    ImageBrand?: string;
    vehiculos?: Vehiculo[]
}

export type Tipo = {
    id: string;
    nombre: string;
    ImageTipo?: string;
    vehiculos?: Vehiculo[]
}

export type Imagenes = {
    id: string;
    url: string;
    vehiculoId: string
}

export type Vehiculo = {
    id: string;
    modelo: string;
    year: number;
    descripcion: string;
    moneda: 'ARS' | 'USD';
    precio: number;
    transmision?: string;
    combustible?: string;
    kilometraje?: number;
    tipoId: string;
    brandId: string;
    vendido?: boolean;
    ubicacion?: string;
    imagenes?: Imagenes[];
    brand?:Brand,
    tipo?:Tipo,
    destacado?: boolean; // 👈 ahora está en el lugar correcto
    descripcion2?: string; // 👈 también
  };

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
    descripcion2?: string; // 👈 nuevo campo
    destacado?: boolean; // 👈 nuevo campo

  }

