import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { Profesores, ProfesorNuevo } from '../interfaces/profesor';
import { Asignatura } from '../interfaces/asignatura'; // Nueva interfaz para asignaturas

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm: FormGroup;

  nuevoProfesor: ProfesorNuevo = {
    username: '',
    rut: 0,
    email: '',
    phone: 0,
    address: '',
    password: '',
    department: '', // Será reemplazado por asignatura
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private fBuilder: FormBuilder,
    private profesorService: ProfesorService
  ) {
    this.registroForm = this.fBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      rut: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,8}-[0-9Kk]{1}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.min(100000000)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$')
      ]),
      asignatura: new FormControl('', [Validators.required]) // Nuevo campo
    });
  }

  ngOnInit() {}

  crearProfesor() {
    if (this.registroForm.valid) {
      // Asignar valores del formulario al nuevo profesor
      this.nuevoProfesor.username = this.registroForm.value.name;
      this.nuevoProfesor.rut = this.registroForm.value.rut;
      this.nuevoProfesor.email = this.registroForm.value.email;
      this.nuevoProfesor.phone = this.registroForm.value.phone;
      this.nuevoProfesor.address = this.registroForm.value.address;
      this.nuevoProfesor.password = this.registroForm.value.password;
      this.nuevoProfesor.department = this.registroForm.value.asignatura; // Asignar la asignatura aquí
  
      // Registrar profesor
      this.profesorService.PostProfesor(this.nuevoProfesor).subscribe((profesorCreado: Profesores) => {
        // Crear la asignatura automáticamente
        const nuevaAsignatura: Asignatura = {
          id: `asignatura${Math.floor(Math.random() * 10000)}`, // ID único
          nombre: this.registroForm.value.asignatura,
          profesorId: profesorCreado.id.toString(), // Convertir a string
          alumnosIds: [] // Inicialmente vacío
        };
  
        // Registrar asignatura
        this.profesorService.PostAsignatura(nuevaAsignatura).subscribe(() => {
          this.registroForm.reset(); // Limpiar el formulario
          this.mostrarMensaje(profesorCreado.username); // Mostrar mensaje de éxito
          this.router.navigateByUrl('/login'); // Redirigir al login
        });
      });
    }
  }
  

  async mostrarMensaje(nombre: string) {
    const alerta = await this.alertController.create({
      header: 'Registro Exitoso',
      message: `¡Bienvenid@ ${nombre}!`,
      buttons: ['OK']
    });
    alerta.present();
  }
}
