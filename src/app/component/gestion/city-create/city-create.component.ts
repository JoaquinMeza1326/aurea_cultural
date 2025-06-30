import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-city-create',
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
  templateUrl: './city-create.component.html',
  styleUrl: './city-create.component.scss',
})
export class CityCreateComponent {
  cityForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  grabar() {
    if (this.cityForm.valid) {
      this.cityService.create(this.cityForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/city-list']);
          this.snackbar.open('Ciudad registrada correctamente', 'OK', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackbar.open('Ocurrió un error al registrar la ciudad', 'OK', {
            duration: 3000,
          });
        },
      });
    } else {
      this.snackbar.open(
        'Por favor, complete todos los campos obligatorios',
        'OK',
        { duration: 2000 }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/admin/city-list']);
  }
}
