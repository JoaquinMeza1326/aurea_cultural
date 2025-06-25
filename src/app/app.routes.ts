import { Routes } from '@angular/router';

import { eventRoutes } from './routes/event.route';
import { userRoutes } from './routes/user.route';
import { adminRoutes } from './routes/admin.route';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'landing',
    loadComponent: () =>
      import('./component/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./component/inicio-sesion/loguearse/loguearse.component').then(
        (m) => m.LoguearseComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './component/inicio-sesion/registrarse/registrarse.component'
      ).then((m) => m.RegistrarseComponent),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./component/cuenta/inicio/inicio.component').then(
        (m) => m.InicioComponent
      ),
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./component/cuenta/transacciones/transacciones.component').then(
        (m) => m.TransaccionesComponent
      ),
  },
  {
    path: 'interests',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./component/cuenta/intereses/intereses.component').then(
        (m) => m.InteresesComponent
      ),
  },
  {
    path: 'tickets',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./component/cuenta/entradas/entradas.component').then(
        (m) => m.EntradasComponent
      ),
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./component/cuenta/reporte/reporte.component').then(
        (m) => m.ReporteComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard, AuthGuard],
    children: adminRoutes,
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: userRoutes,
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    children: eventRoutes,
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
