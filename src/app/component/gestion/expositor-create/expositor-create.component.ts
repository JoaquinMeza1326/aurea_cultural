import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpositorService } from '../../../services/expositor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expositor-create',
  standalone: true,
  imports: [
    MenuAdminComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatError,
  ],
  templateUrl: './expositor-create.component.html',
  styleUrl: './expositor-create.component.scss',
})
export class ExpositorCreateComponent {
  expositorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expositorService: ExpositorService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.expositorForm = this.fb.group({
      nameExpositor: ['', Validators.required],
    });
  }

  grabar() {
    this.expositorService.add(this.expositorForm.value).subscribe({
      next: () => {
        this.snackbar.open('Expositor registrado correctamente', 'OK', {
          duration: 3000,
        });

        this.router.navigate(['/admin/expositor-list']);
      },
      error: () => {
        this.snackbar.open('Error al crear expositor', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/expositor-list']);
  }
}
