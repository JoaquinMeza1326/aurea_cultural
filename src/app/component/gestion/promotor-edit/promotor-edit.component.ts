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
import { PromoterService } from '../../../services/promoter.service';
import { Promoter } from '../../../models/promoter';

@Component({
  selector: 'app-promotor-edit',
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
  templateUrl: './promotor-edit.component.html',
  styleUrl: './promotor-edit.component.scss',
})
export class PromotorEditComponent {
  promotorForm!: FormGroup;
  id: number = 0;

  constructor(
    private promoterService: PromoterService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.promotorForm = this.fb.group({
      details: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPromotorById();
  }

  getPromotorById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.promoterService.getById(Number(id)).subscribe({
      next: (data: Promoter) => {
        this.id = data.id;
        this.promotorForm.patchValue({
          details: data.details,
        });
      },
    });
  }

  grabar() {
    this.promoterService.update(this.id, this.promotorForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/promotor-list']);
        this.snackbar.open('Promotor actualizado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Ocurrió un error al actualizar el promotor', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/promotor-list']);
  }
}
