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

  
  cancelar() {
    this.router.navigate(['/admin/eventtype-list']);
  }
}
