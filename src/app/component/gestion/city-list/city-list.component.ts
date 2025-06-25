import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss',
})
export class CityListComponent {
  constructor(
    private citiesService: CityService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  cities: Array<City> = [];
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Ciudad' },
  ];

  ngOnInit(): void {
    this.getCities();
  }

  newCity() {
    this.router.navigate(['admin/city-create']);
  }

  edit(id: number) {
    this.router.navigate(['admin/city-edit', id]);
  }

  delete(id: number) {
    this.citiesService.delete(id).subscribe({
      next: () => {
        this.getCities();
      },
      error: () => {
        this.snackbar.open('Error al eliminar ciudad', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getCities() {
    this.citiesService.getCities().subscribe({
      next: (data: City[]) => {
        this.cities = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar las ciudades', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
