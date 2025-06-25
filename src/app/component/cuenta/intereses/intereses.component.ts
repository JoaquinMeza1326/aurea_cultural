import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intereses',
  standalone: true,
  imports: [MenuAdminComponent, MatButtonModule, CommonModule],
  templateUrl: './intereses.component.html',
  styleUrl: './intereses.component.scss',
})
export class InteresesComponent {
  categoriasSeleccionadas: string[] = [];

  constructor(private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPreferencias();
  }

  seleccionarCategoria(categoria: string) {
    if (this.categoriasSeleccionadas.includes(categoria)) {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(
        (cat) => cat !== categoria
      );
    } else {
      this.categoriasSeleccionadas.push(categoria);
    }
  }

  obtenerPreferencias() {
    const item = localStorage.getItem('categoriasSeleccionadas');
    this.categoriasSeleccionadas = item ? (JSON.parse(item) as string[]) : [];
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  guardarPreferencias() {
    localStorage.setItem(
      'categoriasSeleccionadas',
      JSON.stringify(this.categoriasSeleccionadas)
    );
    this.snackbar.open('Preferencias guardadas', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/home']);
  }
}
