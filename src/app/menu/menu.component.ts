import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(private router: Router, private modalController: ModalController) {}

  // Navega a la página de perfil
  goToProfile() {
    this.closeMenuAndNavigate('/perfil'); // Ajusta la ruta según corresponda
  }

  // Navega a la página de notificaciones
  goToNotifications() {
    this.closeMenuAndNavigate('/notifications'); // Ajusta la ruta según corresponda
  }

  // Navega a la página de configuración
  goToSettings() {
    this.closeMenuAndNavigate('/config'); // Ajusta la ruta según corresponda
  }

  // Navega a la página de justificar
  goToJustificar() {
    this.closeMenuAndNavigate('/justificar'); // Asegúrate de que la ruta sea correcta
  }

  // Cierra sesión
  logout() {
    this.modalController.dismiss().then(() => {
      // Aquí puedes agregar lógica para cerrar sesión, como limpiar credenciales, etc.
      this.router.navigate(['/inicio']); // Navega a la pantalla de inicio de sesión
    });
  }

  // Cierra el menú
  closeMenu() {
    this.modalController.dismiss();
  }

  // Función auxiliar para cerrar el modal y navegar a una ruta
  private closeMenuAndNavigate(route: string) {
    this.modalController.dismiss().then(() => {
      this.router.navigate([route]);
    });
  }
}
