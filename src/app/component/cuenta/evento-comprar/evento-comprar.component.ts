import { Component, CSP_NONCE } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDto, EventMF } from '../../../models/event';
import { EventService } from '../../../services/event.service';
import { TicketTypeService } from '../../../services/ticket-type.service';
import { TicketType } from '../../../models/ticketType';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TransactionsService } from '../../../services/transactions.service';
import { PurchasedTicketService } from '../../../services/purchased-ticket.service';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'app-evento-comprar',
  standalone: true,
  imports: [
    MenuAdminComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './evento-comprar.component.html',
  styleUrl: './evento-comprar.component.scss',
})
export class EventoComprarComponent {
  event: EventDto = {
    descripcion: '',
    endDate: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
    startDate: '',
  };
  ticketType!: TicketType;
  availableQuantity: number = 0;

  buyForm!: FormGroup;

  constructor(
    private router: Router,
    public eventService: EventService,
    private ticketTypeService: TicketTypeService,
    private transactionService: TransactionsService,
    private purchasedTicket: PurchasedTicketService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    const currentDate = new Date();

    this.buyForm = this.fb.group({
      date: [currentDate],
      amount: [{ value: 0, disabled: true }],
      price: [{ value: 0, disabled: true }],
      quantity: [0, [Validators.required, Validators.min(0)]],
      client_id: [this.authService.getIdUser()],
    });
  }

  ngOnInit(): void {
    this.getTicketInfo();

    this.buyForm
      .get('quantity')
      ?.valueChanges.subscribe(() => this.updateAmount());
    this.buyForm
      .get('price')
      ?.valueChanges.subscribe(() => this.updateAmount());
  }

  grabar() {
    this.transactionService.add(this.buyForm.getRawValue()).subscribe({
      next: (data: Transaction) => {
        this.savePurchasedTicket(data);
      },
      error: () => {
        this.snackbar.open('Error comprar ticket', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  savePurchasedTicket(data: Transaction) {
    this.purchasedTicket
      .add({
        id: 0,
        purchaseDate: data.date,
        purchasePrice: Number(data.amount),
        ticketType_id: this.event.ticketTypeId,
        transaction_id: data.id,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/events/list']);
          this.snackbar.open('Compra realizada', 'Cerrar', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackbar.open('Error comprar ticket', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

 

  getTicketInfo() {
    const idType = this.route.snapshot.paramMap.get('idType') || 0;
    this.ticketTypeService.getById(Number(idType)).subscribe({
      next: (data: TicketType) => {
        this.ticketType = data;
        this.getEventById();
      },
      error: () => {
        this.snackbar.open('Error al cargar los tipos de evento', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  getEventById() {
    const id = this.route.snapshot.paramMap.get('id') || 0;
    this.eventService.getById(Number(id)).subscribe({
      next: (data: EventMF) => {
        this.event = {
          id: data.id,
          descripcion: data.descripcion,
          endDate: data.endDate,
          name: data.nombre,
          startDate: data.startDate,
          price: this.ticketType.price,
          image: data.image,
          ticketTypeId: this.ticketType.id,
        };
        this.availableQuantity = this.ticketType.availableQuantity;
        this.setValuesValidationForm();
      },
      error: () => {
        this.snackbar.open('Error al obtener evento', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  setValuesValidationForm() {
    this.buyForm.patchValue({
      price: this.event.price,
    });

    this.buyForm
      .get('quantity')
      ?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(this.availableQuantity),
      ]);
    this.buyForm.get('quantity')?.updateValueAndValidity();
  }

  cancel() {
    this.router.navigate(['/events/detail', this.event.id]);
  }
}
