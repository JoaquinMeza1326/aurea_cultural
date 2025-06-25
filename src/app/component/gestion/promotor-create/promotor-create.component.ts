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
import { PromoterService } from '../../../services/promoter.service';

@Component({
  selector: 'app-promotor-create',
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
  templateUrl: './promotor-create.component.html',
  styleUrl: './promotor-create.component.scss',
})
export class PromotorCreateComponent {
  promotorForm!: FormGroup;

  constructor(
    private promoterService: PromoterService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.promotorForm = this.fb.group({
      details: ['', Validators.required],
    });
  }

  grabar() {
    this.promoterService.add(this.promotorForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/promotor-list']);
        this.snackbar.open('Promotor registrado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Ocurrió un error al registrar al prmotor', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/promotor-list']);
  }
}
