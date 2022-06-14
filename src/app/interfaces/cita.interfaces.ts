import { Mascota } from "./mascota.interfaces";



export interface Citas{
    id: number,
    fecha: Date,
    mascota: Mascota
  
}

export interface Cita{
    fecha: Date
}