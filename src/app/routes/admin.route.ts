import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'city-list',
    loadComponent: () =>
      import('../component/gestion/city-list/city-list.component').then(
        (m) => m.CityListComponent
      ),
  },
  {
    path: 'city-create',
    loadComponent: () =>
      import('../component/gestion/city-create/city-create.component').then(
        (m) => m.CityCreateComponent
      ),
  },
  {
    path: 'city-edit/:id',
    loadComponent: () =>
      import('../component/gestion/city-edit/city-edit.component').then(
        (m) => m.CityEditComponent
      ),
  },
  {
    path: 'event-list',
    loadComponent: () =>
      import('../component/gestion/event-list/event-list.component').then(
        (m) => m.EventListComponent
      ),
  },
  {
    path: 'event-create',
    loadComponent: () =>
      import('../component/gestion/event-create/event-create.component').then(
        (m) => m.EventCreateComponent
      ),
  },
  {
    path: 'event-edit/:id',
    loadComponent: () =>
      import('../component/gestion/event-edit/event-edit.component').then(
        (m) => m.EventEditComponent
      ),
  },
  {
    path: 'expositor-create',
    loadComponent: () =>
      import(
        '../component/gestion/expositor-create/expositor-create.component'
      ).then((m) => m.ExpositorCreateComponent),
  },
  {
    path: 'expositor-edit/:id',
    loadComponent: () =>
      import(
        '../component/gestion/expositor-edit/expositor-edit.component'
      ).then((m) => m.ExpositorEditComponent),
  },
  {
    path: 'expositor-list',
    loadComponent: () =>
      import(
        '../component/gestion/expositor-list/expositor-list.component'
      ).then((m) => m.ExpositorListComponent),
  },
  {
    path: 'sponsor-create',
    loadComponent: () =>
      import(
        '../component/gestion/sponsor-create/sponsor-create.component'
      ).then((m) => m.SponsorCreateComponent),
  },
  {
    path: 'sponsor-edit/:id',
    loadComponent: () =>
      import('../component/gestion/sponsor-edit/sponsor-edit.component').then(
        (m) => m.SponsorEditComponent
      ),
  },
  {
    path: 'sponsor-list',
    loadComponent: () =>
      import('../component/gestion/sponsor-list/sponsor-list.component').then(
        (m) => m.SponsorListComponent
      ),
  },
  {
    path: 'promotor-create',
    loadComponent: () =>
      import(
        '../component/gestion/promotor-create/promotor-create.component'
      ).then((m) => m.PromotorCreateComponent),
  },
  {
    path: 'promotor-edit/:id',
    loadComponent: () =>
      import('../component/gestion/promotor-edit/promotor-edit.component').then(
        (m) => m.PromotorEditComponent
      ),
  },
  {
    path: 'promotor-list',
    loadComponent: () =>
      import('../component/gestion/promotor-list/promotor-list.component').then(
        (m) => m.PromotorListComponent
      ),
  },
  {
    path: 'eventtype-create',
    loadComponent: () =>
      import(
        '../component/gestion/eventtype-create/eventtype-create.component'
      ).then((m) => m.EventtypeCreateComponent),
  },
  {
    path: 'eventtype-edit/:id',
    loadComponent: () =>
      import(
        '../component/gestion/eventtype-edit/eventtype-edit.component'
      ).then((m) => m.EventtypeEditComponent),
  },
  {
    path: 'eventtype-list',
    loadComponent: () =>
      import(
        '../component/gestion/eventtype-list/eventtype-list.component'
      ).then((m) => m.EventtypeListComponent),
  },
  {
    path: 'tickettype-create',
    loadComponent: () =>
      import(
        '../component/gestion/tickettype-create/tickettype-create.component'
      ).then((m) => m.TickettypeCreateComponent),
  },
  {
    path: 'tickettype-edit/:id',
    loadComponent: () =>
      import(
        '../component/gestion/tickettype-edit/tickettype-edit.component'
      ).then((m) => m.TickettypeEditComponent),
  },
  {
    path: 'tickettype-list',
    loadComponent: () =>
      import(
        '../component/gestion/tickettype-list/tickettype-list.component'
      ).then((m) => m.TickettypeListComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
