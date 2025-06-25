import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PromoterService } from '../../../services/promoter.service';
import { Promoter } from '../../../models/promoter';

@Component({
  selector: 'app-promotor-list',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './promotor-list.component.html',
  styleUrl: './promotor-list.component.scss',
})
export class PromotorListComponent {
  constructor(
    private promotorService: PromoterService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  promoters: Array<Promoter> = [];
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'details', header: 'Nombre' },
  ];

  ngOnInit(): void {
    this.getPromoters();
  }

  newPromotor() {
    this.router.navigate(['admin/promotor-create']);
  }

  edit(id: number) {
    this.router.navigate(['admin/promotor-edit', id]);
  }

  delete(id: number) {
    this.promotorService.delete(id).subscribe({
      next: () => {
        this.getPromoters();
      },
      error: () => {
        this.snackbar.open('Error al eliminar promotor', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getPromoters() {
    this.promotorService.getPromotores().subscribe({
      next: (data: Promoter[]) => {
        this.promoters = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar las ciudades', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
