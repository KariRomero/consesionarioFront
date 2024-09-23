import Brand from "./brand";
import Tipo from "./tipo";
import Imagenes from "./imagenes";

export interface Vehiculo {
    id:number;
    modelo:string;
    year:number;
    descripcion:string;
    precio:number;
    transmision?:string;
    combustible?:string;
    kilometraje?:number;
    tipoId:number;
    brandId:number;
    imagenes: Imagenes[];
    tipo?:Tipo;
    brand?:Brand
}