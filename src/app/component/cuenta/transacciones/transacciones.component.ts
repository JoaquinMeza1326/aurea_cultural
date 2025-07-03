import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { Transaction } from '../../../models/transaction';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.scss',
})
export class TransaccionesComponent {
  constructor(
    private transactionService: TransactionsService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  transactions: Array<Transaction> = [];
  clientId: number = 0;
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'date', header: 'Fecha' },
    { field: 'amount', header: 'Monto' },
    { field: 'quantity', header: 'Cantidad' },
  ];

  ngOnInit(): void {
    this.clientId = this.authService.getIdUser();
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactionsByClient(this.clientId).subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar las ciudades', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
