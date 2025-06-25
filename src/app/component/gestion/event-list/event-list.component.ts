import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../shared/table/table.component';
import { EventService } from '../../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventMF } from '../../../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [MenuAdminComponent, MatIconModule, TableComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'capacity', header: 'Capacidad' },
    { field: 'startDate', header: 'Fecha Inicio' },
    { field: 'endDate', header: 'Fecha Fin' },
    { field: 'address', header: 'Dirección' },
    { field: 'accessCode', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
  ];
  events: Array<EventMF> = [];

  constructor(
    private eventService: EventService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  newEvent() {
    this.router.navigate(['/admin/event-create']);
  }

  edit(id: number) {
    this.router.navigate(['/admin/event-edit', id]);
  }
  delete(id: number) {
    this.eventService.delete(id).subscribe({
      next: () => {
        this.getEvents();
      },
      error: () => {
        this.snackbar.open('Error al eliminar evento', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getEvents() {
    this.eventService.getEventos().subscribe({
      next: (data: EventMF[]) => {
        this.events = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar los eventos', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
