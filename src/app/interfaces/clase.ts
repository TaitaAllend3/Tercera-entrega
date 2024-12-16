export interface Clase {
    id: string;
    asignaturaId: string;
    asignaturaNombre: string;  // Propiedad agregada
    profesorId: string;
    profesorNombre: string;
    presentes: any[];
    ausentes: any[];
    dia: string;
  }
  