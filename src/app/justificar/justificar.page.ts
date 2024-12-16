import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificar',
  templateUrl: './justificar.page.html',
  styleUrls: ['./justificar.page.scss'],
})
export class JustificarPage implements OnInit {
  justificationRequests: any[] = []; // Justificaciones pendientes
  selectedClassId: string = ''; // ID de la clase activa (asumido desde el contexto)

  constructor(
    private profesorService: ProfesorService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarJustificaciones();
  }

  cargarJustificaciones() {
    // Obtener el ID de la clase seleccionada
    const clase = sessionStorage.getItem('selectedClass');
    if (clase) {
      const parsedClass = JSON.parse(clase);
      this.selectedClassId = parsedClass.id;

      // Cargar las justificaciones de la clase
      this.profesorService.GetJustificaciones(this.selectedClassId).subscribe(
        (data) => {
          this.justificationRequests = data;
          console.log('Justificaciones cargadas:', this.justificationRequests);
        },
        (error) => console.error('Error cargando justificaciones:', error)
      );
    } else {
      console.error('No se encontró una clase seleccionada en sessionStorage.');
    }
  }

  aceptarJustificacion(request: any) {
    if (!this.selectedClassId) return;

    this.profesorService
      .UpdateJustificacion(this.selectedClassId, request.alumnoId, 'aceptada')
      .subscribe(
        () => {
          this.showAlert('Justificación aceptada', `La justificación de ${request.alumnoNombre} ha sido aceptada.`);
          this.actualizarEstadoAsistencia(request.alumnoId, 'Presente');
          this.removerJustificacion(request.alumnoId);
        },
        (error) => console.error('Error aceptando justificación:', error)
      );
  }

  rechazarJustificacion(request: any) {
    if (!this.selectedClassId) return;

    this.profesorService
      .UpdateJustificacion(this.selectedClassId, request.alumnoId, 'rechazada')
      .subscribe(
        () => {
          this.showAlert('Justificación rechazada', `La justificación de ${request.alumnoNombre} ha sido rechazada.`);
          this.removerJustificacion(request.alumnoId);
        },
        (error) => console.error('Error rechazando justificación:', error)
      );
  }

  actualizarEstadoAsistencia(alumnoId: string, estado: string) {
    if (!this.selectedClassId) return;

    this.profesorService
      .UpdateClase(this.selectedClassId, {
        actualizarAsistencia: {
          alumnoId: alumnoId,
          estado: estado,
        },
      })
      .subscribe(
        () => console.log(`Asistencia actualizada para ${alumnoId}: ${estado}`),
        (error) => console.error('Error actualizando asistencia:', error)
      );
  }

  removerJustificacion(alumnoId: string) {
    this.justificationRequests = this.justificationRequests.filter(
      (request) => request.alumnoId !== alumnoId
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
