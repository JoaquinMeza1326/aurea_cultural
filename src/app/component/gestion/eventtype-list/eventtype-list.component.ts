import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventType } from '../../../models/eventType';
import { EventTypeService } from '../../../services/event-type.service';

@Component({
  selector: 'app-eventtype-list',
  standalone: true,
  imports: [MenuAdminComponent, MatIconModule, TableComponent],
  templateUrl: './eventtype-list.component.html',
  styleUrl: './eventtype-list.component.scss',
})
export class EventtypeListComponent {
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'theme', header: 'Tema' },
    { field: 'description', header: 'Descripción' },
    { field: 'eventName', header: 'Nombre Evento' },
  ];
  typeEvents: Array<EventType> = [];

  constructor(
    private typeEventService: EventTypeService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  newEvent() {
    this.router.navigate(['/admin/eventtype-create']);
  }

  edit(id: number) {
    this.router.navigate(['/admin/eventtype-edit', id]);
  }
  delete(id: number) {
    this.typeEventService.delete(id).subscribe({
      next: () => {
        this.getEvents();
      },
      error: () => {
        this.snackbar.open('Error al eliminar tipo evento', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getEvents() {
    this.typeEventService.getTipoEventos().subscribe({
      next: (data: EventType[]) => {
        this.typeEvents = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar los tipos eventos', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
