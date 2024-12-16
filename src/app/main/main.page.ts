import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component'; // Ajusta la ruta según corresponda


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  isMenuOpen = false;

  constructor(private router: Router, private modalController: ModalController) { }

  viewQR() {
    // Redirigir a la página QR (cambiar la ruta según corresponda)
    this.router.navigate(['/qr']);
  }

  viewClasses() {
    // Redirigir a la página de mis clases (cambiar la ruta según corresponda)
    this.router.navigate(['/classes']);
  }

  async openMenu() {
    const modal = await this.modalController.create({
      component: MenuComponent,
      breakpoints: [0, 0.5, 1], // Define los puntos de quiebre (0: oculto, 0.5: mitad, 1: pantalla completa)
      initialBreakpoint: 0.5,  // Inicialmente muestra el modal a la mitad de la pantalla
      cssClass: 'half-modal'
    });
    return await modal.present();
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  
}
