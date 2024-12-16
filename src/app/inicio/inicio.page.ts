import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  constructor(private router: Router, private alertController: AlertController) { }

  async login() {
    // Mostrar el mensaje de bienvenida para docentes
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: 'Inicio de sesión exitoso - Docente',
      buttons: ['OK']
    });

    await alert.present();

    // Esperar a que el usuario cierre el mensaje
    await alert.onDidDismiss();

    // Redirigir a la pantalla principal de docentes
    this.router.navigate(['/main-docente']);
  }

}
