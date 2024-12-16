import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfesorService } from '../services/profesor.service';
import { Clase } from '../interfaces/clase';
import { Asignatura } from '../interfaces/asignatura';
import { Profesores } from '../interfaces/profesor';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  clases: Clase[] = [];
  profesorData: Profesores | undefined; // Permite que sea undefined inicialmente
  asignatura: Asignatura | undefined;  // Permite que sea undefined inicialmente

  constructor(
    private router: Router,
    private alertController: AlertController,
    private profesorService: ProfesorService
  ) {}

  ngOnInit() {
    this.loadProfesorData();  // Cargar los datos del profesor al inicializar
    this.loadClases(); // Cargar las clases después de cargar los datos del profesor
  }

  // Cargar los datos del profesor desde el sessionStorage
  loadProfesorData() {
    const profesor = sessionStorage.getItem('profesor');
    if (profesor) {
      this.profesorData = JSON.parse(profesor);
      console.log('Profesor cargado:', this.profesorData);  // Verifica los datos del profesor
      this.loadAsignatura(); // Cargar la asignatura asociada al profesor
    }
  }

  // Cargar la asignatura asociada al profesor
  loadAsignatura() {
    this.profesorService.GetAllAsignaturas().subscribe(
      (asignaturas) => {
        // Buscar la asignatura que corresponde al profesor logueado
        this.asignatura = asignaturas.find(
          (asignatura) => asignatura.profesorId === this.profesorData?.id.toString()
        );
        console.log('Asignatura asociada:', this.asignatura); // Verifica la asignatura asociada
      },
      (error) => {
        console.error('Error al obtener asignaturas:', error);
      }
    );
  }

  loadClases() {
    this.profesorService.GetAllClases().subscribe(
      (data) => {
        console.log('Datos de clases:', data);  // Verifica los datos recibidos
        // Filtrar las clases que corresponden al profesor logueado
        this.clases = data.filter(clase => clase.profesorId === this.profesorData?.id.toString());
        console.log('Clases filtradas:', this.clases); // Verifica las clases filtradas
      },
      (error) => {
        console.error('Error al obtener clases:', error);  // Manejando el error
      }
    );
  }

  openAsistencia() {
    this.router.navigate(['/profesor-asistencia']); // Redirige a la página de asistencia
  }

  async openCreateClass() {
    if (!this.asignatura) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se ha encontrado una asignatura asociada a tu cuenta.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Crear Clase',
      inputs: [
        {
          name: 'asignaturaNombre',
          type: 'text',
          placeholder: 'Nombre de la asignatura',
          value: this.asignatura.nombre,  // Rellenamos con el nombre de la asignatura asociada
          disabled: true, // El nombre de la asignatura no debe ser editado
        },
        {
          name: 'dia',
          type: 'text',
          placeholder: 'Día (e.g., Lunes)',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.addClass(data.dia);
          },
        },
      ],
    });

    await alert.present();
  }

  addClass(dia: string) {
    if (!this.profesorData?.id || !this.asignatura) {
      console.error('Profesor o asignatura no encontrados');
      return;
    }

    const nuevaClase: Clase = {
      id: `clase${Math.floor(Math.random() * 10000)}`, // Generar un ID único para la clase
      asignaturaId: this.asignatura.id, // ID de la asignatura asociada
      asignaturaNombre: this.asignatura.nombre, // Nombre de la asignatura asociada
      profesorId: this.profesorData.id.toString(), // ID del profesor logueado
      profesorNombre: this.profesorData.username, // Nombre del profesor
      presentes: [], // Inicialmente vacío
      ausentes: [], // Inicialmente vacío
      dia, // Día de la clase
    };

    // Guardar la nueva clase en el servidor
    this.profesorService.PostClase(nuevaClase).subscribe(
      (claseGuardada) => {
        this.clases.push(claseGuardada); // Actualizar la lista local con la clase guardada
      },
      (error) => {
        console.error('Error al agregar la clase:', error);
      }
    );
  }
}
