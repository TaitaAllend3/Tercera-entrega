export interface Profesores {
    id: number;
    username: string; // Nombre de usuario (equivalente a "name" en HTML)
    rut: number; // RUT del profesor
    email: string;
    phone: number; // Teléfono en formato string para soportar números internacionales
    address: string;
    password: string;
    department: string; // Departamento del profesor // Lista de asignaturas impartidas
}

export interface ProfesorNuevo {
    username: string; // Nombre de usuario
    rut: number; // RUT del profesor
    email: string;
    phone: number; // Teléfono
    address: string;
    password: string;
    department: string; // Departamento // Lista de asignaturas impartidas
}
