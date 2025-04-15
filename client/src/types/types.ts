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

type Imagenes = {
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
    imagenes?: Imagenes[]
}