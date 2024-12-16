import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private builder: FormBuilder,
    private profesorService: ProfesorService,
    private toast: ToastController
  ) {
    this.loginForm = this.builder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {}

  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    try {
      // Llama al servicio para obtener los datos del profesor
      this.profesorService.GetProfesorByEmail(email).subscribe(
        async (profesor) => {
          console.log('Profesor obtenido:', profesor);

          // Validar la contraseña
          if (profesor.password.trim() !== password.trim()) {
            await this.ErrorUsuario();
            this.loginForm.reset();
            return;
          }

          // Guarda el profesor en sessionStorage
          sessionStorage.setItem('email', profesor.email);
          sessionStorage.setItem('profesor', JSON.stringify(profesor));

          // Redirige a la página principal
          this.IniciarSesion(profesor);
        },
        async (error) => {
          console.error('Error al obtener el profesor:', error);
          await this.UsuarioNoExiste();
        }
      );
    } catch (error) {
      console.error('Error durante el proceso de login:', error);
      await this.ErrorUsuario();
    }
  }

  private IniciarSesion(profesor: any) {
    this.showToast('Sesión iniciada correctamente');
    this.router.navigate(['/main']);
  }

  async showToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async ErrorUsuario() {
    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'Contraseña incorrecta. Por favor, intente nuevamente.',
      buttons: ['OK'],
    });
    alerta.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No se encontró un profesor con este correo. Por favor, regístrese.',
      buttons: ['OK'],
    });
    alerta.present();
  }

  goBack() {
    this.router.navigate(['/inicio']);
  }
}
