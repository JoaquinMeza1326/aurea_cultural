import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { User, UserDto } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorityService } from '../../../services/authority.service';
import { Authority } from '../../../models/authority';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss',
})
export class RegistrarseComponent {
  user!: UserDto;
  authority!: Authority;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private snackbar: MatSnackBar,
    private authorityService: AuthorityService,
    private router: Router
  ) {
    this.user = {
      id: 0,
      age: 0,
      Bio: '',
      dni: '',
      firstName: '',
      gender: '',
      lastName: '',
      phone: '',
      password: '',
      username: '',
      active: true,
    };
  }

  ngOnInit() {
    this.getAuthorities();
  }

  register() {
    this.userService
      .create(
        this.user.username!,
        this.user.password!,
        this.user.active!,
        this.authority.id
      )
      .subscribe({
        next: (data: User) => {
          this.user.id = data.id;
          this.saveClient();
        },
        error: () => {
          this.snackbar.open('Error al crear usuario', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  getAuthorities() {
    this.authorityService.getAuthorities().subscribe({
      next: (data: Authority[]) => {
        this.authority = data.find((x) => x.name == 'USUARIO') as Authority;
      },
      error: () => {
        this.snackbar.open('Error al obtener authorities', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  saveClient() {
    this.clientService
      .add({
        age: 0,
        dni: this.user.dni,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: this.user.gender,
        phone: this.user.phone,
        user_id: this.user.id ? this.user.id.toString() : '',
        id: 0,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['login']);
          this.snackbar.open('Usuario registrado', 'Cerrar', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackbar.open('Error al crear usuario', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
