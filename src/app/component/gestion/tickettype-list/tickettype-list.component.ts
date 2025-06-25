import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TicketTypeService } from '../../../services/ticket-type.service';
import { TicketType } from '../../../models/ticketType';

@Component({
  selector: 'app-tickettype-list',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './tickettype-list.component.html',
  styleUrl: './tickettype-list.component.scss',
})
export class TickettypeListComponent {
  constructor(
    private ticketTypeService: TicketTypeService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  ticketTypes: Array<TicketType> = [];
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Nombre' },
    { field: 'price', header: 'Precio' },
    { field: 'availableQuantity', header: 'Cantidad disponible' },
  ];

  ngOnInit(): void {
    this.getTicketTypes();
  }

  newTicketType() {
    this.router.navigate(['admin/tickettype-create']);
  }

  edit(id: number) {
    this.router.navigate(['admin/tickettype-edit', id]);
  }

  delete(id: number) {
    this.ticketTypeService.delete(id).subscribe({
      next: () => {
        this.getTicketTypes();
      },
      error: () => {
        this.snackbar.open('Error al eliminar tipo de ticket', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getTicketTypes() {
    this.ticketTypeService.getTicketTypes().subscribe({
      next: (data: TicketType[]) => {
        this.ticketTypes = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar lost tipo de ticket', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
