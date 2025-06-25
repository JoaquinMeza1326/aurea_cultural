import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatInputModule } from '@angular/material/input';
import { SponsorService } from '../../../services/sponsor.service';

@Component({
  selector: 'app-sponsor-create',
  standalone: true,
  imports: [
    MatError,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MenuAdminComponent,
    MatInputModule,
  ],
  templateUrl: './sponsor-create.component.html',
  styleUrl: './sponsor-create.component.scss',
})
export class SponsorCreateComponent {
  sponsorForm!: FormGroup;

  constructor(
    private sponsorService: SponsorService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.sponsorForm = this.fb.group({
      nombreSponsor: ['', Validators.required],
    });
  }

  grabar() {
    this.sponsorService.add(this.sponsorForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/sponsor-list']);
        this.snackbar.open('Sponsor registrado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Ocurrió un error al registrar al sponsor', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/sponsor-list']);
  }
}
