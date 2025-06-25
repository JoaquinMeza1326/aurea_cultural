import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { Claim } from '../../../models/claim';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaimService } from '../../../services/claim.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MenuAdminComponent,
    CommonModule,
  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteComponent {
  claim!: Claim;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private claimService: ClaimService
  ) {
    this.claim = {
      client_id: this.authService.getIdUser(),
      description: '',
      Title: '',
    };
  }

  grabar() {
    this.claimService.create(this.claim).subscribe({
      next: () => {
        this.snackbar.open('Reclamo enviado correctamente.', 'OK', {
          duration: 3000,
        });

        this.router.navigate(['home']);
      },
      error: () => {
        this.snackbar.open('Error al enviar reclamo', 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
