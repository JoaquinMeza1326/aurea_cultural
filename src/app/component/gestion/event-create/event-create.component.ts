import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../../services/event.service';
import { EventMF } from '../../../models/event';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { EventType } from '../../../models/eventType';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EventTypeService } from '../../../services/event-type.service';
import { PromoterService } from '../../../services/promoter.service';
import { Promoter } from '../../../models/promoter';
import { SponsorService } from '../../../services/sponsor.service';
import { ExpositorService } from '../../../services/expositor.service';
import { Expositor } from '../../../models/expositor';
import { Sponsor } from '../../../models/Sponsor';
// cambios
@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [
    MatError,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MenuAdminComponent,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss',
})
export class EventCreateComponent {
  eventForm!: FormGroup;
  id: number = 0;

  cities: City[] = [];
  eventTypes: EventType[] = [];
  promoters: Promoter[] = [];
  expositors: Expositor[] = [];
  sponsors: Sponsor[] = [];

  selectedFile: any;
  imageUrl: any;

  public formErrors: { [key: string]: any } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public eventService: EventService,
    private cityService: CityService,
    private eventTypeService: EventTypeService,
    private promoterService: PromoterService,
    private sponsorService: SponsorService,
    private expositorService: ExpositorService,
    private snackbar: MatSnackBar
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      capacity: ['', [Validators.required, Validators.min(1)]],
      accessCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      eventType: ['', Validators.required],
      promoter: ['', Validators.required],
      expositor: ['', Validators.required],
      sponsor: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCities();
    this.getEventTypes();
    this.getPromoters();
    this.getSponsors();
    this.getExpositors();
  }

  checkFormErrors() {
    this.formErrors = {};
    Object.keys(this.eventForm.controls).forEach((field) => {
      const control = this.eventForm.get(field);
      if (control && control.invalid) {
        this.formErrors[field] = control.errors;
      }
    });
  }

  getCities() {
    this.cityService.getCities().subscribe({
      next: (data: City[]) => {
        this.cities = data;
      },
      error: () => {
        this.snackbar.open('Error al obtener ciudades', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  getEventTypes() {
    this.eventTypeService.getTipoEventos().subscribe({
      next: (data: EventType[]) => {
        this.eventTypes = data;
      },
      error: () => {
        this.snackbar.open('Error al obtener tipos de evento', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  getPromoters() {
    this.promoterService.getPromotores().subscribe({
      next: (data: Promoter[]) => {
        this.promoters = data;
      },
      error: () => {
        this.snackbar.open('Error al obtener promotores', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  getExpositors() {
    this.expositorService.getExpositors().subscribe({
      next: (data: Expositor[]) => {
        this.expositors = data;
      },
      error: () => {
        this.snackbar.open('Error al obtener expositores', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  getSponsors() {
    this.sponsorService.getSponsors().subscribe({
      next: (data: Sponsor[]) => {
        this.sponsors = data;
      },
      error: () => {
        this.snackbar.open('Error al obtener sponsores', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  SelectedFile(event: any): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
  }

  save() {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);

      this.eventService.upload(formData).subscribe({
        next: (data) => {
          this.create(data.url);
        },
        error: () => {
          this.snackbar.open('Error al subir archivo', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    } else {
      this.create();
    }
  }

  create(image = '') {
    if (image.length > 0) {
      this.eventForm.patchValue({ image: image });
    }

    this.eventService.add(this.eventForm.value).subscribe({
      next: () => {
        this.router.navigate(['admin/event-list']);
        this.snackbar.open('Evento creado', 'Cerrar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Error al crear evento', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancel() {
    this.router.navigate(['/admin/event-list']);
  }
}
