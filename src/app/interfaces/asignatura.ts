export interface Asignatura {
    id: string; // ID único para la asignatura
    nombre: string; // Nombre de la asignatura
    profesorId: string; // ID del profesor que imparte la asignatura
    alumnosIds: string[]; // Lista de IDs de los alumnos inscritos
  }
  