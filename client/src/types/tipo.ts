import { Vehiculo } from "./vehiculo";

export default interface Tipo {
    id:number;
    nombre:string;
    ImageTipo?:string;
    vehiculos?:Vehiculo[]
}