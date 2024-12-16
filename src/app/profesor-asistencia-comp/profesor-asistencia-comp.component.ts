import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';
import { Router } from '@angular/router';
import { Profesores } from '../interfaces/profesor';

@Component({
  selector: 'app-profesor-asistencia',
  templateUrl: './profesor-asistencia-comp.component.html',
  styleUrls: ['./profesor-asistencia-comp.component.scss']
})
export class ProfesorAsistenciaComp implements OnInit {
  profesor: any = {}; // Datos del profesor
  estudiantes: any[] = []; // Lista de estudiantes
  asignatura: string = ''; // Nombre de la asignatura
  fecha: string = new Date().toISOString().split('T')[0]; // Fecha actual
  clase: any;  // Aquí almacenaremos los datos de la clase seleccionada
  clases: any[] = []; // Aquí almacenamos las clases del profesor
  clasesAsignaturas: any[] = []; // Agregamos esta propiedad para almacenar las asignaturas
  selectedClass: any; // Clase seleccionada para obtener los estudiantes

  constructor(
    private profesorService: ProfesorService, // Usamos el servicio
    private router: Router
  ) { }

  ngOnInit() {
    console.log('Iniciando ngOnInit...');
    if (history.state.clase) {
      console.log('Clase encontrada en el estado de navegación:', history.state.clase);
      this.clase = history.state.clase;
      this.asignatura = this.clase.asignaturaNombre;
      this.selectedClass = this.clase;
      this.cargarProfesor();
      this.cargarEstudiantes();
    } else {
      console.log('No hay clase en el estado, cargando clases...');
      if (this.profesor && this.profesor.id) { // Asegúrate de que el profesor tiene un id válido
        this.cargarClases();
      } else {
        console.warn('No hay profesor cargado, cargando el profesor...');
        this.cargarProfesor();  // Aquí debes cargar al profesor
      }
    }
  }
  

  cargarProfesor() {
    const email = sessionStorage.getItem('email');
    console.log('Email en sessionStorage:', email); // Asegúrate de que el email esté correctamente almacenado
    if (email) {
      this.profesorService.GetProfesorByEmail(email).subscribe(
        (profesor: Profesores) => {
          console.log('Respuesta de la API al cargar el profesor:', profesor);
          if (profesor) {
            this.profesor = profesor;
            this.cargarClases();
          } else {
            console.error('No se encontró el profesor en la API.');
          }
        },
        (error) => {
          console.error('Error al cargar el profesor:', error);
        }
      );
      
    } else {
      console.error('No se encontró email en sessionStorage.');
    }
  }
  

  cargarClases() {
    console.log('Intentando cargar clases para el profesor:', this.profesor);
  
    // Verifica que el ID del profesor esté disponible
    if (!this.profesor.id) {
      console.error('El ID del profesor no está definido.');
      return;  // Detener la ejecución si no hay un ID válido
    }
  
    // Si tenemos asignatura seleccionada, filtramos por asignatura, de lo contrario, obtenemos todas las clases
    if (this.asignatura) {
      this.profesorService.GetClasesPorProfesorYAsignatura(this.profesor.id, this.asignatura).subscribe(
        (clases: any[]) => {
          console.log('Clases obtenidas del servicio:', clases);
          this.clases = clases;
  
          this.profesorService.GetAllAsignaturas().subscribe(
            (asignaturas: any[]) => {
              console.log('Asignaturas obtenidas:', asignaturas);
              this.clasesAsignaturas = asignaturas;
  
              // Aquí relacionamos las clases con sus asignaturas correspondientes
              this.clases.forEach((clase) => {
                const asignatura = this.clasesAsignaturas.find(
                  (a) => a.nombre === clase.asignaturaNombre
                );
                if (asignatura) {
                  clase.asignaturaId = asignatura.id;
                }
              });
  
              if (this.clases.length > 0) {
                this.selectedClass = this.clases[0];
                console.log('Clase seleccionada automáticamente:', this.selectedClass);
                this.asignatura = this.selectedClass.asignaturaNombre;
                this.cargarEstudiantes();  // Llamada aquí después de cargar las clases
              } else {
                console.warn('No hay clases disponibles para esta asignatura.');
              }
            },
            (error) => console.error('Error al obtener asignaturas:', error)
          );
        },
        (error) => console.error('Error al obtener clases filtradas por asignatura:', error)
      );
    } else {
      // Si no hay asignatura, obtenemos todas las clases
      this.profesorService.GetClasesPorProfesor(this.profesor.id).subscribe(
        (clases: any[]) => {
          console.log('Clases obtenidas del servicio:', clases);
          this.clases = clases;
  
          this.profesorService.GetAllAsignaturas().subscribe(
            (asignaturas: any[]) => {
              console.log('Asignaturas obtenidas:', asignaturas);
              this.clasesAsignaturas = asignaturas;
  
              // Aquí relacionamos las clases con sus asignaturas correspondientes
              this.clases.forEach((clase) => {
                const asignatura = this.clasesAsignaturas.find(
                  (a) => a.nombre === clase.asignaturaNombre
                );
                if (asignatura) {
                  clase.asignaturaId = asignatura.id;
                }
              });
  
              if (this.clases.length > 0) {
                this.selectedClass = this.clases[0];
                console.log('Clase seleccionada automáticamente:', this.selectedClass);
                this.asignatura = this.selectedClass.asignaturaNombre;
                this.cargarEstudiantes();  // Llamada aquí después de cargar las clases
              } else {
                console.warn('No hay clases disponibles.');
              }
            },
            (error) => console.error('Error al obtener asignaturas:', error)
          );
        },
        (error) => console.error('Error al obtener clases:', error)
      );
    }
  }
  



  cargarEstudiantes() {
    console.log('Iniciando cargarEstudiantes...');
    this.profesorService.GetEstudiantes().subscribe(
      (data: any[]) => {
        console.log('Estudiantes cargados desde el servicio:', data);
        const asignaturaId = this.selectedClass?.asignaturaId;

        if (asignaturaId) {
          console.log('Obteniendo asignatura con ID:', asignaturaId);
          this.profesorService.GetAsignaturaById(asignaturaId).subscribe(
            (asignatura) => {
              console.log('Asignatura cargada:', asignatura);
              if (asignatura && asignatura.alumnosIds) {
                this.estudiantes = data.filter((estudiante) =>
                  asignatura.alumnosIds.includes(estudiante.id)
                );
                console.log('Estudiantes inscritos en la asignatura:', this.estudiantes);
              } else {
                console.warn('No hay estudiantes inscritos en esta asignatura.');
              }
            },
            (error) => console.error('Error al obtener asignatura:', error)
          );
        } else {
          console.warn('No se encontró asignaturaId en la clase seleccionada.');
        }
      },
      (error) => console.error('Error al obtener estudiantes:', error)
    );
  }

  registrarAsistencia() {
    // Inicializar ausentes con todos los alumnos inscritos en la asignatura
    this.selectedClass.ausentes = this.estudiantes.map((estudiante) => estudiante.id);
    this.selectedClass.presentes = []; // Inicializa presentes vacío
  
    // Guardar los cambios en el servidor o JSON
    this.profesorService.UpdateClase(this.selectedClass.id, this.selectedClass).subscribe((response) => {
      console.log('Asistencia registrada: Ausentes inicializados.', response);
    }, (error) => {
      console.error('Error al registrar asistencia:', error);
    });
  }
  

  marcarAsistencia(id: string, estado: string) {
    const estudiante = this.estudiantes.find((e) => e.id === id);
    if (estudiante) {
      estudiante.asistencia = estado;
  
      if (estado === 'Presente') {
        // Mover de ausentes a presentes
        if (!this.selectedClass.presentes.includes(id)) {
          this.selectedClass.presentes.push(id);
        }
        const index = this.selectedClass.ausentes.indexOf(id);
        if (index > -1) {
          this.selectedClass.ausentes.splice(index, 1);
        }
      } else if (estado === 'Ausente') {
        // Mover de presentes a ausentes
        if (!this.selectedClass.ausentes.includes(id)) {
          this.selectedClass.ausentes.push(id);
        }
        const index = this.selectedClass.presentes.indexOf(id);
        if (index > -1) {
          this.selectedClass.presentes.splice(index, 1);
        }
      }
  
      // Guardar los cambios en el servidor o JSON
      this.profesorService.UpdateClase(this.selectedClass.id, this.selectedClass).subscribe((response) => {
        console.log('Asistencia actualizada:', response);
      }, (error) => {
        console.error('Error al actualizar asistencia:', error);
      });
    }
  }
  

  finalizarLista() {
    // Analiza los presentes y ausentes
    if (!this.selectedClass.presentes) this.selectedClass.presentes = [];
    if (!this.selectedClass.ausentes) this.selectedClass.ausentes = [];

    this.selectedClass.presentes.forEach((id: string) => { // Línea 152
      this.NotificarEstudiante(id, 'presente');
    });

    this.selectedClass.ausentes.forEach((id: string) => { // Línea 156
      this.NotificarEstudiante(id, 'ausente');
    });


    // Guardar la lista final en el servidor o JSON
    this.profesorService.UpdateClase(this.selectedClass.id, this.selectedClass).subscribe(
      () => console.log('Asistencia finalizada y guardada.'),
      (error) => console.error('Error al finalizar lista:', error)
    );
  }

  NotificarEstudiante(estudianteId: string, estado: 'presente' | 'ausente') {
    this.profesorService.NotificarEstudiante(estudianteId, estado).subscribe(
      () => console.log(`Notificación enviada a ${estudianteId}`),
      (error) => console.error(`Error notificando a ${estudianteId}:`, error)
    );
  }

  goBack() {
    this.router.navigate(['/classes']); // Volver a la página anterior
  }
}
