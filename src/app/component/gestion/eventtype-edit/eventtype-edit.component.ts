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
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventType } from '../../../models/eventType';

@Component({
  selector: 'app-eventtype-edit',
  standalone: true,
  imports: [
    MenuAdminComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatError,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './eventtype-edit.component.html',
  styleUrl: './eventtype-edit.component.scss',
})
export class EventtypeEditComponent {
  eventTypeForm!: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private eventTypeService: EventTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.eventTypeForm = this.fb.group({
      theme: ['', Validators.required],
      eventName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEventTypeById();
  }

  getEventTypeById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.eventTypeService.getById(Number(id)).subscribe({
      next: (data: EventType) => {
        this.id = data.id;
        this.eventTypeForm.patchValue({
          theme: data.theme,
          eventName: data.eventName,
          description: data.description,
        });
      },
      error: () => {
        this.snackbar.open('Error al actualizar un tipo de evento', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['/admin/eventtype-list']);
      },
    });
  }

  grabar() {
    this.eventTypeService.update(this.id, this.eventTypeForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/eventtype-list']);
        this.snackbar.open('Tipo de evento actualizado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Error al actualizar un tipo de evento', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/eventtype-list']);
  }
}
