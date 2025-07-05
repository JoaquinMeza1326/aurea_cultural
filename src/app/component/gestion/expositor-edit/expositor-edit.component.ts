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
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Expositor } from '../../../models/expositor';

@Component({
  selector: 'app-expositor-edit',
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
  templateUrl: './expositor-edit.component.html',
  styleUrl: './expositor-edit.component.scss',
})
export class ExpositorEditComponent {
  expositorForm!: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private expositorService: ExpositorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.expositorForm = this.fb.group({
      nameExpositor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getExpositorById();
  }

  getExpositorById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.expositorService.getById(Number(id)).subscribe({
      next: (data: Expositor) => {
        this.id = data.id;
        this.expositorForm.patchValue({
          nameExpositor: data.nameExpositor,
        });
      },
    });
  }

  
  cancelar() {
    this.router.navigate(['/admin/expositor-list']);
  }
}
