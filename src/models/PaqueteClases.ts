export interface DeportistaLight {
  id: string;
  nombre: string;
}

export class PaqueteClases {
  idPaquete: number;
  deportista: DeportistaLight;
  totalClases: number;
  clasesRestantes: number;
  fechaPago: string;
  activo: boolean;

  constructor(
    idPaquete: number,
    deportista: DeportistaLight,
    totalClases: number,
    clasesRestantes: number,
    fechaPago: string,
    activo: boolean
  ) {
    this.idPaquete = idPaquete;
    this.deportista = deportista;
    this.totalClases = totalClases;
    this.clasesRestantes = clasesRestantes;
    this.fechaPago = fechaPago;
    this.activo = activo;
  }
}
