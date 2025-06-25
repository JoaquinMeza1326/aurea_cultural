import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { Expositor } from '../../../models/expositor';
import { ExpositorService } from '../../../services/expositor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expositor-list',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './expositor-list.component.html',
  styleUrl: './expositor-list.component.scss',
})
export class ExpositorListComponent {
  expositors: Expositor[] = [];
  columns: { field: string; header: string }[] = [
    { field: 'id', header: ' Id' },
    { field: 'nameExpositor', header: ' Nombre Expositor' },
  ];

  constructor(
    private expositorService: ExpositorService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getExpositors();
  }

  getExpositors() {
    this.expositorService.getExpositors().subscribe({
      next: (data: Expositor[]) => {
        this.expositors = data;
      },
      error: () => {
        this.snackbar.open('Error al obtener expositores', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  newExpositor() {
    this.router.navigate(['admin/expositor-create']);
  }

  edit(id: number) {
    this.router.navigate(['admin/expositor-edit', id]);
  }

  delete(id: number) {
    this.expositorService.delete(id).subscribe({
      next: () => {
        this.getExpositors();
      },
      error: () => {
        this.snackbar.open('Error al eliminar ciudad', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
