import { Routes } from '@angular/router';

export const eventRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('../component/cuenta/evento-listar/evento-listar.component').then(
        (m) => m.EventoListarComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import(
        '../component/cuenta/evento-detalle/evento-detalle.component'
      ).then((m) => m.EventoDetalleComponent),
  },
  {
    path: 'buy/:id/:idType',
    loadComponent: () =>
      import(
        '../component/cuenta/evento-comprar/evento-comprar.component'
      ).then((m) => m.EventoComprarComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import(
        '../component/cuenta/evento-favoritos/evento-favoritos.component'
      ).then((m) => m.EventoFavoritosComponent),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
