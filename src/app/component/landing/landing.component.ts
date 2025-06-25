import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../shared/header-landing/header-landing.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderLandingComponent, MatIcon, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
