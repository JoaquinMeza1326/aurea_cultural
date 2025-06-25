import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-landing.component.html',
  styleUrl: './header-landing.component.scss',
})
export class HeaderLandingComponent {}
