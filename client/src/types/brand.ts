import { Vehiculo } from "./vehiculo";

export default interface Brand {
    id:number,
    nombre:string;
    ImageBrand?:string;
    vehiculos?: Vehiculo[]
}