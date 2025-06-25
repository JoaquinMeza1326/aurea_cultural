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
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatInputModule } from '@angular/material/input';
import { SponsorService } from '../../../services/sponsor.service';
import { Sponsor } from '../../../models/Sponsor';

@Component({
  selector: 'app-sponsor-edit',
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
  templateUrl: './sponsor-edit.component.html',
  styleUrl: './sponsor-edit.component.scss',
})
export class SponsorEditComponent {
  sponsorForm!: FormGroup;
  id: number = 0;

  constructor(
    private sponsorService: SponsorService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.sponsorForm = this.fb.group({
      nombreSponsor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSponsorById();
  }

  getSponsorById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.sponsorService.getById(Number(id)).subscribe({
      next: (data: Sponsor) => {
        this.id = data.id;
        this.sponsorForm.patchValue({
          nombreSponsor: data.nombreSponsor,
        });
      },
      error: () => {
        this.snackbar.open('Ocurrió un error al obtener sponsor', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['/admin/sponsor-list']);
      },
    });
  }

  grabar() {
    this.sponsorService.update(this.id, this.sponsorForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/sponsor-list']);
        this.snackbar.open('Sponsor actualizado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Ocurrió un error al actualizar al sponsor', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/sponsor-list']);
  }
}
