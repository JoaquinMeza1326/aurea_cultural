import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { City } from '../../../models/city';

@Component({
  selector: 'app-city-edit',
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
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.scss',
})
export class CityEditComponent {
  cityForm!: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.getCityById();
  }

  getCityById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.cityService.getById(Number(id)).subscribe({
      next: (data: City) => {
        this.id = data.id;
        this.cityForm.patchValue({
          name: data.name,
        });
      },
      error: () => {
        this.snackbar.open('No se encontró ciudad', 'OK', { duration: 2000 });
      },
    });
  }

  grabar() {
    if (this.cityForm.valid) {
      this.cityService.update(this.id, this.cityForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/city-list']);
          this.snackbar.open('Ciudad actualizada correctamente', 'OK', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackbar.open('Ocurrió un error al actualizar la ciudad', 'OK', {
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
