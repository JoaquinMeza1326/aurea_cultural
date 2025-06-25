import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss',
})
export class MenuAdminComponent {
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin = this.authService.getAuthoritie() === 'ADMIN';
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
