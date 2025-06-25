import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { PurchasedTicketService } from '../../../services/purchased-ticket.service';
import { PurcharsedTicket } from '../../../models/purchasedTicket';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.scss',
})
export class EntradasComponent {
  constructor(
    private purchasedTicketService: PurchasedTicketService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  tickets: Array<PurcharsedTicket> = [];
  clientId: number = 0;
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'purchasePrice', header: 'Precio de Compra' },
    { field: 'purchaseDate', header: 'Fecha' },
  ];

  ngOnInit(): void {
    this.clientId = this.authService.getIdUser();
    this.getPurchasedTickets();
  }

  getPurchasedTickets() {
    this.purchasedTicketService
      .getPurchasedTicketsByClient(this.clientId)
      .subscribe({
        next: (data: PurcharsedTicket[]) => {
          this.tickets = data;
        },
        error: () => {
          this.snackbar.open('Error al cargar las ciudades', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
