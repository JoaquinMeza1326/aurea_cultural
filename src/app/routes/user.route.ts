import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'update',
    loadComponent: () =>
      import(
        '../component/cuenta/usuario-actualizar/usuario-actualizar.component'
      ).then((m) => m.UsuarioActualizarComponent),
  },
];
