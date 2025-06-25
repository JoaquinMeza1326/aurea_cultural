import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableComponent } from '../../shared/table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Promoter } from '../../../models/promoter';
import { SponsorService } from '../../../services/sponsor.service';
import { Sponsor } from '../../../models/Sponsor';

@Component({
  selector: 'app-sponsor-list',
  standalone: true,
  imports: [MenuAdminComponent, TableComponent, MatIconModule],
  templateUrl: './sponsor-list.component.html',
  styleUrl: './sponsor-list.component.scss',
})
export class SponsorListComponent {
  constructor(
    private sponsorService: SponsorService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  sponsors: Array<Sponsor> = [];
  columns: { field: string; header: string }[] = [
    { field: 'id', header: 'Id' },
    { field: 'nombreSponsor', header: 'Nombre' },
  ];

  ngOnInit(): void {
    this.getSponsors();
  }

  newSponsor() {
    this.router.navigate(['admin/sponsor-create']);
  }

  edit(id: number) {
    this.router.navigate(['admin/sponsor-edit', id]);
  }

  delete(id: number) {
    this.sponsorService.delete(id).subscribe({
      next: () => {
        this.getSponsors();
      },
      error: () => {
        this.snackbar.open('Error al eliminar promotor', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getSponsors() {
    this.sponsorService.getSponsors().subscribe({
      next: (data: Sponsor[]) => {
        this.sponsors = data;
      },
      error: () => {
        this.snackbar.open('Error al cargar las ciudades', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
