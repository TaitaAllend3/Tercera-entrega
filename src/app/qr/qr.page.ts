import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular'; // Importar para verificar si está en dispositivo

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  scannedCode: string = ''; // Almacena el código escaneado
  scanEnabled: boolean = true; // Controla la lógica del escáner

  constructor(private platform: Platform) { }

  ngOnInit() {
    if (!this.platform.is('capacitor')) {
      console.warn('El escaneo solo funciona en un dispositivo real.');
    }
  }

  // Verificar permisos antes de iniciar el escaneo
  async checkPermissionAndStartScan() {
    try {
      // Solicitar permisos de cámara
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        this.startScan();
      } else if (status.denied) {
        alert(
          'Permiso de cámara denegado. Por favor, habilítalo en la configuración de la aplicación.'
        );
      }
    } catch (error) {
      console.error('Error al verificar permisos: ', error);
    }
  }

  // Método para iniciar el escaneo
  async startScan() {
    try {
      // Ocultar UI para mostrar la cámara
      document.body.style.background = 'transparent';
      await BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log('Código escaneado: ', result.content);
        this.scannedCode = result.content;
        this.scanEnabled = false; // Deshabilitar el escáner
      } else {
        console.log('No se encontró contenido en el código QR.');
      }
    } catch (error) {
      console.error('Error al escanear: ', error);
    } finally {
      // Mostrar UI de nuevo
      await BarcodeScanner.showBackground();
      document.body.style.background = 'transparent';
    }
  }


  // Método para detener el escaneo
  async stopScanning() {
    await BarcodeScanner.stopScan();
    this.scanEnabled = true; // Habilitar el escáner
  }

  // Reiniciar el escaneo
  restartScan() {
    this.scannedCode = ''; // Limpiar el código escaneado
    this.scanEnabled = true; // Activar el escáner nuevamente
  }
}
