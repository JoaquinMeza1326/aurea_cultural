import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { Transaction } from '../../../models/transaction';
import { TransactionsService } from '../../../services/transactions.service';
import { FavoriteService } from '../../../services/favorite.service';
import { Favorite, FavoriteDto } from '../../../models/favorite';

@Component({
  selector: 'app-evento-favoritos',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './evento-favoritos.component.html',
  styleUrl: './evento-favoritos.component.scss',
})
export class EventoFavoritosComponent {
  constructor(
    private favoriteService: FavoriteService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  favorites: Array<FavoriteDto> = [];
  clientId: number = 0;
  columns: { field: string; header: string }[] = [
    { field: 'code', header: 'Código' },
    { field: 'eventName', header: 'Evento' },
    { field: 'startDate', header: 'Fecha Inicio' },
    { field: 'endDate', header: 'Fecha Fin' },
  ];

  ngOnInit(): void {
    this.clientId = this.authService.getIdUser();
    this.getTransactions();
  }

  getTransactions() {
    this.favoriteService.getFavoritesByClient(this.clientId).subscribe({
      next: (data: Favorite[]) => {
        this.favorites = data.map((x) => {
          return {
            id: x.id,
            eventName: x.event.nombre,
            code: x.event.accessCode,
            startDate: x.event.startDate,
            endDate: x.event.endDate,
          };
        });
      },
      error: () => {
        this.snackbar.open('Error al cargar las ciudades', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
