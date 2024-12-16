import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Profesores, ProfesorNuevo } from '../interfaces/profesor';
import { environment } from 'src/environments/environment';
import { Clase } from '../interfaces/clase';
import { Asignatura } from '../interfaces/asignatura';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  gestionarJustificativo(alumnoId: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpclient: HttpClient) { }

  // Obtener todos los profesores
  GetAllProfesores(): Observable<Profesores[]> {
    return this.httpclient.get<Profesores[]>(`${environment.apiUrl}/profesores`);
  }

  // Obtener un profesor por correo
  GetProfesorByEmail(email: string): Observable<Profesores> {
    return this.httpclient.get<Profesores[]>(`${environment.apiUrl}/profesores/?email=${email}`).pipe(
      map((profesores: Profesores[]) => {
        if (profesores.length > 0) {
          return profesores[0];  // Devuelve el primer profesor encontrado
        } else {
          throw new Error('Profesor no encontrado');
        }
      })
    );
  } 
  

  // Servicio: Obtener profesor por id
  GetProfesorById(id: string): Observable<Profesores> {
    return this.httpclient.get<Profesores[]>(`${environment.apiUrl}/profesores/${id}`).pipe(
      map((profesores: Profesores[]) => profesores[0])  // Devuelve solo el primer objeto del arreglo
    );
  }  

  // Registrar un nuevo profesor
  PostProfesor(profesor: ProfesorNuevo): Observable<Profesores> {
    return this.httpclient.post<Profesores>(
      `${environment.apiUrl}/profesores`,
      profesor
    );
  }

  // Actualizar datos de un profesor
  UpdateProfesor(updatedProfesor: Profesores): Observable<Profesores> {
    return this.httpclient.put<Profesores>(
      `${environment.apiUrl}/profesores/${updatedProfesor.id}`,
      updatedProfesor
    );
  }

  // Obtener todos los estudiantes
  GetEstudiantes(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${environment.apiUrl}/estudiantes`);
  }

  // Actualizar el estado de asistencia de un estudiante
  UpdateEstudiante(id: string, estado: string): Observable<any> {
    return this.httpclient.put<any>(
      `${environment.apiUrl}/estudiantes/${id}`,
      { asistencia: estado }
    );
  }

  // Obtener las asignaturas
  GetAllAsignaturas(): Observable<Asignatura[]> {
    return this.httpclient.get<Asignatura[]>(`${environment.apiUrl}/asignaturas`);
  }

  // Obtener una asignatura por ID
  GetAsignaturaById(asignaturaId: string): Observable<Asignatura> {
    return this.httpclient.get<Asignatura>(
      `${environment.apiUrl}/asignaturas/${asignaturaId}`
    );
  }

  // Registrar una nueva asignatura
  PostAsignatura(nuevaAsignatura: Asignatura): Observable<Asignatura> {
    return this.httpclient.post<Asignatura>(
      `${environment.apiUrl}/asignaturas`,
      nuevaAsignatura
    );
  }

  // Obtener todas las clases
  GetAllClases(): Observable<Clase[]> {
    return this.httpclient.get<Clase[]>(`${environment.apiUrl}/clases`);
  }

  // Obtener clases por profesor
  GetClasesPorProfesor(profesorId: string): Observable<Clase[]> {
    return this.httpclient.get<Clase[]>(
      `${environment.apiUrl}/clases?profesorId=${profesorId}`
    );
  }

  // Obtener clases filtradas por profesor y asignatura
  GetClasesPorProfesorYAsignatura(
    profesorId: string,
    asignaturaNombre: string
  ): Observable<Clase[]> {
    return this.httpclient.get<Clase[]>(
      `${environment.apiUrl}/clases?profesorId=${profesorId}&asignatura=${asignaturaNombre}`
    );
  }

  // Registrar una nueva clase
  PostClase(nuevaClase: Clase): Observable<Clase> {
    return this.httpclient.post<Clase>(`${environment.apiUrl}/clases`, nuevaClase);
  }

  // Actualizar una clase
  UpdateClase(claseId: string, claseData: any): Observable<any> {
    return this.httpclient.put<any>(
      `${environment.apiUrl}/clases/${claseId}`,
      claseData
    );
  }

  // Manejo de justificaciones
  GetJustificaciones(claseId: string): Observable<any[]> {
    return this.httpclient.get<any[]>(
      `${environment.apiUrl}/clases/${claseId}/justificaciones`
    );
  }

  UpdateJustificacion(
    claseId: string,
    alumnoId: string,
    estado: 'aceptada' | 'rechazada'
  ): Observable<any> {
    return this.httpclient.put<any>(
      `${environment.apiUrl}/clases/${claseId}/justificaciones`,
      { alumnoId, estado }
    );
  }

  // Notificar al estudiante sobre asistencia o justificación
  NotificarEstudiante(estudianteId: string, mensaje: string): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiUrl}/notificaciones`, {
      estudianteId,
      mensaje,
      leido: false,
      fecha: new Date().toISOString(),
    });
  }


  // Guardar profesor en sessionStorage
  SaveProfesor(profesor: Profesores): void {
    sessionStorage.setItem('profesor', JSON.stringify(profesor));
  }

  // Obtener profesor guardado en sessionStorage
  GetSavedProfesor(): Profesores | null {
    const profesor = sessionStorage.getItem('profesor');
    return profesor ? JSON.parse(profesor) : null;
  }

  // Cerrar sesión
  Logout(): void {
    sessionStorage.removeItem('profesor');
  }
}
