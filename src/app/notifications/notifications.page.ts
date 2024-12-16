import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications = [
    {
      title: 'Cambio de Horario',
      message: 'El horario de tu clase de Química ha sido modificado a las 10:00 AM.',
      timestamp: new Date()
    },
    {
      title: 'Nueva Tarea',
      message: 'Se ha creado una nueva tarea para la clase de Historia.',
      timestamp: new Date()
    },
    {
      title: 'Evento Importante',
      message: 'La reunión de planificación de semestres se llevará a cabo el próximo lunes a las 3:00 PM.',
      timestamp: new Date()
    },
    {
      title: 'Recordatorio de Evaluación',
      message: 'Recuerda que el examen de Matemáticas es el próximo viernes.',
      timestamp: new Date()
    },
    {
      title: 'Actualización de Aula',
      message: 'La clase de Literatura se ha trasladado al aula 105.',
      timestamp: new Date()
    },
    {
      title: 'Nuevo Mensaje',
      message: 'Tienes un nuevo mensaje en la plataforma de gestión de clases.',
      timestamp: new Date()
    },
    {
      title: 'Confirmación de Asistencia',
      message: 'Se ha confirmado tu asistencia a la reunión de profesores del próximo miércoles.',
      timestamp: new Date()
    },
    // Nuevas notificaciones para solicitudes de justificación
    {
      title: 'Solicitud de Justificación',
      message: 'El estudiante Juan Pérez ha solicitado justificar su inasistencia a la clase de Matemáticas del 5 de septiembre.',
      timestamp: new Date()
    },
    {
      title: 'Solicitud de Justificación Aprobada',
      message: 'La solicitud de justificación del estudiante Ana Martínez para la clase de Química del 6 de septiembre ha sido aprobada.',
      timestamp: new Date()
    },
    {
      title: 'Solicitud de Justificación Rechazada',
      message: 'La solicitud de justificación del estudiante Carlos Gómez para la clase de Historia del 7 de septiembre ha sido rechazada.',
      timestamp: new Date()
    }
  ];

  constructor() {}

  ngOnInit() {}
}
