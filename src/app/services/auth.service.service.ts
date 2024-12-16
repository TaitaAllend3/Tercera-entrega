import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private profesorData: any = null; // Aquí guardas los datos del profesor

  constructor() {}

  // Guardar los datos del profesor cuando inicie sesión
  setProfesorData(profesor: any) {
    this.profesorData = profesor;
  }

  // Obtener los datos del profesor
  getProfesorData() {
    return this.profesorData;
  }

  // Si lo deseas, también puedes agregar un método para limpiar la sesión
  clearProfesorData() {
    this.profesorData = null;
  }
}
