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
import { TicketTypeService } from '../../../services/ticket-type.service';
import { EventMF } from '../../../models/event';
import { EventService } from '../../../services/event.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TicketType } from '../../../models/ticketType';

@Component({
  selector: 'app-tickettype-edit',
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
  templateUrl: './tickettype-edit.component.html',
  styleUrl: './tickettype-edit.component.scss',
})
export class TickettypeEditComponent {
  ticketTypeForm!: FormGroup;
  events: EventMF[] = [];
  id: number = 0;

  constructor(
    private ticketTypeService: TicketTypeService,
    private eventService: EventService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
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
    this.getTicketTypeById();
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

  getTicketTypeById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.ticketTypeService.getById(Number(id)).subscribe({
      next: (data: TicketType) => {
        console.log(data);
        this.id = data.id;
        this.ticketTypeForm.patchValue({
          name: data.name,
          price: data.price,
          availableQuantity: data.availableQuantity,
          event_id: data.event.id,
        });
      },
      error: () => {
        this.snackbar.open('Error al obtener el tipo de ticket', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  grabar() {
    this.ticketTypeService
      .update(this.id, this.ticketTypeForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/tickettype-list']);
          this.snackbar.open('Tipo de ticket actualizado correctamente', 'OK', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackbar.open(
            'Ocurrió un error al actualizar el tipo de ticket',
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
