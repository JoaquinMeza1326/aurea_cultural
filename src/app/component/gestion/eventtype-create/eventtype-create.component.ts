import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { EventTypeService } from '../../../services/event-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-eventtype-create',
  standalone: true,
  imports: [
    MenuAdminComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatError,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './eventtype-create.component.html',
  styleUrl: './eventtype-create.component.scss',
})
export class EventtypeCreateComponent {
  eventTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventTypeService: EventTypeService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.eventTypeForm = this.fb.group({
      theme: ['', Validators.required],
      eventName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

grabar() {
    this.eventTypeService.add(this.eventTypeForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/eventtype-list']);
        this.snackbar.open('Tipo de evento registrado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Error al registrar un tipo de evento', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/eventtype-list']);
  }
}
