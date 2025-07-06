import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-actualizar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MenuAdminComponent,
    ReactiveFormsModule,
    MatError,
    MatOptionModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './usuario-actualizar.component.html',
  styleUrl: './usuario-actualizar.component.scss',
})
export class UsuarioActualizarComponent {
  clientForm!: FormGroup;
  userId: number = 0;
  categoriasSeleccionadas: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: [0, Validators.required],
      phone: ['', Validators.required],
      dni: ['', [Validators.required]],
      user_id: [this.authService.getIdUser()],
    });
  }

  ngOnInit() {
    this.userId = this.authService.getIdUser();
    this.getClientById();
    this.obtenerPreferencias();
  }

  getClientById() {
    this.clientService.getById(this.userId).subscribe({
      next: (data: Client) => {
        this.clientForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          phone: data.phone,
          dni: data.dni,
        });
      },
      error: () => {
        this.snackbar.open('Error al obtener datos usuario', 'Error', {
          duration: 2000,
        });
        this.router.navigate(['/home']);
      },
    });
  }

  obtenerPreferencias() {
    const item = localStorage.getItem('categoriasSeleccionadas');
    this.categoriasSeleccionadas = item ? (JSON.parse(item) as string[]) : [];
  }

  grabar() {
    this.clientService.update(this.userId, this.clientForm.value).subscribe({
      next: () => {
        this.snackbar.open('Datos actualizados', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        this.snackbar.open('Error al actualizar datos', 'Error', {
          duration: 2000,
        });
      },
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
