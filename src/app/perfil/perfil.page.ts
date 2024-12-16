import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';
import { Profesores } from '../interfaces/profesor';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface Profesor {
    id: number;
    username: string; // Nombre de usuario (equivalente a "name" en HTML)
    rut: number; // RUT del profesor
    email: string;
    phone: number; // Teléfono en formato string para soportar números internacionales
    address: string;
    password: string;
    department: string; // Departamento del profesor
    subject: string; // Lista de asignaturas impartidas
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public editable: boolean = true; // Estado de edición inicializado a true
  public nombre: string = '';
  public email: string = '';
  public password: string = '';
  public telefono: number | null = null;
  public direccion: string = '';
  public rut: number | null = null;
  public department: string = ''; // Esta será una cadena separada por comas
  private profesorId: number | null = null;
  private jsonUrl = 'http://localhost:3000/profesores'; // Cambia aquí para apuntar al endpoint correcto
  private loggedInProfeId: number | null = null; // Inicializa userId desde sessionStorage
  public profeData: Profesores | null = null; // Variable para almacenar los datos del usuario

  
  constructor(private profesorService: ProfesorService, private router: Router) {}

  ngOnInit() {
    const profesor = JSON.parse(sessionStorage.getItem('profesor') || '{}');
    if (profesor && profesor.id) {
      this.loggedInProfeId = profesor.id;
      this.getProfeData().subscribe(
        (data: Profesores[])=> {
          this.profeData = data.find(profesor => profesor.id === this.loggedInProfeId) || null;
          if (this.profeData) {
            this.nombre = this.profeData.username;
            this.email = this.profeData.email;
            this.telefono = this.profeData.phone;
            this.direccion = this.profeData.address;
            this.rut = this.profeData.rut;
            this.department = this.profeData.department;
            this.profesorId = this.profeData.id;

            console.log('Datos de usuario cargados: ', this.profeData);
          }
        },
        (error) => {
          console.error('Error al cargar los datos de profe:', error);
        }
      );
    } else {
      console.warn('No hay profesor autenticado. Redirigiendo al login...');
      this.router.navigate(['/login']);
    }
  } 

  getProfeData(): Observable<Profesores[]> {
    return this.profesorService.GetAllProfesores(); // Asegúrate de que este método esté en tu servicio
  }

  cargarDatosProfesor() {
    if (this.profesorId !== null) {
      this.profesorService.GetProfesorByEmail(this.profesorId.toString()).subscribe(
        (data: Profesores) => {
          this.nombre = data.username;
          this.email = data.email;
          this.password = data.password; // Carga la contraseña (opcional, solo si se permite)
          this.telefono = data.phone;
          this.direccion = data.address;
          this.department = data.department; // Convierte el array a cadena para previsualizar
          console.log('Datos del profesor cargados:', data);
        },
        (error) => {
          console.error('Error al cargar los datos del profesor:', error);
        }
      );
    }
  }  

  guardarCambios() {
    if (this.profesorId !== null) {
      const updatedProfesor: Profesores = {
        id: this.profesorId,
        username: this.nombre,
        email: this.email,
        password: this.password, // Se recomienda no enviar la contraseña si no es necesario
        phone: this.telefono || 0, // Evita valores nulos asignando un valor predeterminado
        address: this.direccion,
        rut: 0, // Si no usas RUT en este formulario, puedes asignar un valor predeterminado
        department: this.department, // Convertir cadena a lista
      };
  
      this.profesorService.UpdateProfesor(updatedProfesor).subscribe(
        (response) => {
          console.log('Profesor actualizado con éxito:', response);
          sessionStorage.setItem('profesor', JSON.stringify(updatedProfesor));
        },
        (error) => {
          console.error('Error al actualizar los datos del profesor:', error);
        }
      );
    } else {
      console.error('El ID del profesor no está definido');
    }
  }  
}
