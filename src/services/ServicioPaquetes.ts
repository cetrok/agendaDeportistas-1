import axios from "axios";
import { PaqueteClases } from "../models/PaqueteClases";

export class ServicioPaquetes {
  private static instancia: ServicioPaquetes;
  private ruta: string;

  public static getInstancia(): ServicioPaquetes {
    if (!this.instancia) {
      this.instancia = new ServicioPaquetes();
    }
    return this.instancia;
  }

  constructor() {
    this.ruta = "http://localhost:8080/api/paquetes/";
  }

  public async crearPaquete(paquete: Partial<PaqueteClases>): Promise<PaqueteClases> {
    try {
      const response = await axios.post<PaqueteClases>(this.ruta + "crear", paquete);
      return response.data;
    } catch (error) {
      console.error("Error creando paquete:", error);
      throw new Error("No se pudo registrar el pago");
    }
  }

  public async obtenerPaquetesPorDeportista(deportistaId: string): Promise<PaqueteClases[]> {
    try {
      const response = await axios.get<PaqueteClases[]>(this.ruta + "listar/" + deportistaId);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo paquetes:", error);
      return [];
    }
  }

  public async obtenerDeportistasAgotados(): Promise<PaqueteClases[]> {
    try {
      const response = await axios.get<PaqueteClases[]>(this.ruta + "agotados");
      return response.data;
    } catch (error) {
      console.error("Error obteniendo alertas de paquetes:", error);
      return [];
    }
  }

  public async obtenerIdsSinPaqueteActivo(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>(this.ruta + "sinActivo");
      return response.data;
    } catch (error) {
      console.error("Error obteniendo IDs sin paquete activo:", error);
      return [];
    }
  }
}
