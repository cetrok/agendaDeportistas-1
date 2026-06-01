import axios from "axios";
import { Curso } from "../models/Curso";

export class ServicioCursos {
  private cursos: Curso[];
  private static instancia: ServicioCursos;
  private ruta: String;

  public static getInstancia(): ServicioCursos {
    if (!this.instancia) {
      this.instancia = new ServicioCursos();
    }

    return this.instancia;
  }

  constructor() {
    this.cursos = [];
    this.ruta = "http://localhost:8080/api/cursos/";
  }

  //funcion para cargar cursos Dummy
  public cargarCursosDummy(): void {
    this.cursos.push(
      new Curso(
        1,
        "Mamitas 1",
        "Femenino",
        "Maternas",
        "1er trimestre",
        "",
        "1",
        "",
        "",
        "1",
        "0",
        "#77DD77"
      )
    );
    this.cursos.push(
      new Curso(
        2,
        "Baby 1",
        "Mixto",
        "Bebes",
        "2 meses",
        "",
        "1",
        "",
        "",
        "1",
        "0",
        "#FAFAD2"
      )
    );
    this.cursos.push(
      new Curso(
        3,
        "Baile 1",
        "Femenino",
        "Niños",
        "6 años",
        "Acrobacia",
        "Básico",
        "Individual",
        "Bailarines",
        "1",
        "0",
        "#FF5733"
      )
    );
  }

  //FUncion para obtener los cursos desde el backend
  public async obtenerCursos(): Promise<Curso[]> {
    try {
      //realizar llamado a servicio rest
      const response = await axios.get(this.ruta + "listar");

      //console.log(JSON.stringify(response.data));

      this.cursos = response.data;

      //console.log(JSON.stringify(this.cursos));
      return this.cursos;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch cursos");
    } finally {
      console.log("finalizado obtener cursos");
    }
  }

  // Función para listar todos los cursos
  public listarCursos(): Curso[] {
    return this.cursos;
  }

  // Función para agregar un nuevo curso
  public async agregarCurso(curso: Curso): Promise<Curso> {
    try {
      const response = await axios.post<Curso>(this.ruta + "crear", curso);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create curso");
    }
  }

  // Función para eliminar un curso existente
  public async eliminarCurso(id: number): Promise<void> {
    try {
      //realizar llamado a servicio rest
      await axios.delete(this.ruta + "eliminar/" + id);
    } catch (error) {
      console.error("ERROR al eliminar: " + error);
      throw new Error("Failed to delete curso");
    } finally {
      console.log("finalizado eliminar cursos");
    }
  }

  // Función para actualizar un curso existente
  public async actualizarCurso(curso: Curso): Promise<void> {
    try {
      await axios.put(this.ruta + "actualizar", curso);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update curso");
    }
  }

  // Función para obtener un curso por su id
  public obtenerCursoPorId(id: number): Curso | undefined {
    return this.cursos.find((c) => c.idCurso === id);
  }

  // Función para obtener el siguiente id disponible
  public obtenerSiguienteId(): number {
    return this.cursos.length + 1;
  }
}
