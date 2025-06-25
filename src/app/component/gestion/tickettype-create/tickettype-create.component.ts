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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatInputModule } from '@angular/material/input';
import { TicketTypeService } from '../../../services/ticket-type.service';
import { EventMF } from '../../../models/event';
import { EventService } from '../../../services/event.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tickettype-create',
  standalone: true,
  imports: [
    MatError,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MenuAdminComponent,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './tickettype-create.component.html',
  styleUrl: './tickettype-create.component.scss',
})
export class TickettypeCreateComponent {
  ticketTypeForm!: FormGroup;
  events: EventMF[] = [];

  constructor(
    private ticketTypeService: TicketTypeService,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.ticketTypeForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      availableQuantity: [0, Validators.required],
      event_id: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEventos().subscribe({
      next: (data: EventMF[]) => {
        this.events = data;
      },
      error: () => {
        this.snackbar.open('Ocurrió un error al obtener eventos', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  grabar() {
    this.ticketTypeService.add(this.ticketTypeForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/tickettype-list']);
        this.snackbar.open('Tipo de ticket registrado correctamente', 'OK', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open(
          'Ocurrió un error al registrar el tipo de ticket',
          'OK',
          {
            duration: 3000,
          }
        );
      },
    });
  }
  cancelar() {
    this.router.navigate(['/admin/tickettype-list']);
  }
}
