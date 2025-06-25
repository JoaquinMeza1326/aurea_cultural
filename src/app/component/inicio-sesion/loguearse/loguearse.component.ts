import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loguearse',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './loguearse.component.html',
  styleUrl: './loguearse.component.scss',
})
export class LoguearseComponent {
  user: User = new User('', '');

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        this.authService.saveLogin(response);
        this.snackbar.open('Inicio de sesión correcto', 'Cerrar', {
          duration: 3000,
        });

        if (response.authorities == 'ADMIN') {
          this.router.navigate(['/admin/city-list']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.snackbar.open(
          'Credenciales incorrectas. Intenta nuevamente.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }
}
