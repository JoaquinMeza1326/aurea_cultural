import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { MatIcon } from '@angular/material/icon';
import { EventService } from '../../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventMF } from '../../../models/event';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { EventType } from '../../../models/eventType';
import { Promoter } from '../../../models/promoter';
import { City } from '../../../models/city';
import { Sponsor } from '../../../models/Sponsor';
import { FormsModule } from '@angular/forms';
import { FavoriteService } from '../../../services/favorite.service';
import { AuthService } from '../../../services/auth.service';
import { Favorite } from '../../../models/favorite';
import { Expositor } from '../../../models/expositor';
type FilterKey = keyof EventMF;

@Component({
  selector: 'app-evento-listar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MenuAdminComponent,
    MatIcon,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
  ],
  templateUrl: './evento-listar.component.html',
  styleUrl: './evento-listar.component.scss',
})
export class EventoListarComponent {
  eventos: Array<EventMF> = [];
  eventsFiltereds: EventMF[] = [];
  visibleCount: number = 6;
  selectedFilters: { [key: string]: number } = {
    eventType: 0,
    promoter: 0,
    city: 0,
    sponsor: 0,
    expositor: 0,
  };

  eventTypes: EventType[] = [];
  promotors: Promoter[] = [];
  cities: City[] = [];
  sponsors: Sponsor[] = [];
  expositors: Expositor[] = [];
  favorites: Favorite[] = [];

  constructor(
    public eventService: EventService,
    private favoriteService: FavoriteService,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.getFavorites();
  }

  ngOnInit(): void {
    this.getEvents();
    this.getFavorites();
  }

  viewMore() {
    this.visibleCount += 3;
  }

  back() {
    this.router.navigate(['/home']);
  }

  buy(id: number) {
    this.router.navigate(['events/detail', id]);
  }

  getFavorites() {
    this.favoriteService
      .getFavoritesByClient(this.authService.getIdUser())
      .subscribe({
        next: (data: Favorite[]) => {
          this.favorites = data;
        },
        error: () => {},
      });
  }

  setFavoriteClass(id: number) {
    if (!this.favorites) this.favorites = [];
    if (this.favorites.length > 0) {
      const isFavorite = this.favorites
        ?.map((x) => x.event.id)
        .some((x) => x == id);
      return isFavorite;
    }
    return false;
  }

  setFavorite(id: number) {
    const eventFavorite = this.favorites.find((x) => x.event.id == id);

    if (!eventFavorite) {
      this.addFavorite(id);
    } else {
      this.deleteFavorite(eventFavorite.id);
    }
  }

  deleteFavorite(id: number) {
    this.favoriteService?.delete(id).subscribe({
      next: () => {
        this.getFavorites();
        this.snackbar.open('Favorito eliminado', 'Cerrar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackbar.open('Error al borrar favorito', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  addFavorite(id: number) {
    this.favoriteService
      .add({
        client_id: this.authService.getIdUser(),
        event_id: id,
      })
      .subscribe({
        next: () => {
          this.getFavorites();
          this.snackbar.open('Favorito guardado', 'Cerrar', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackbar.open('Error al guardar favorito', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  getEvents() {
    this.eventService.getEventos().subscribe({
      next: (data: EventMF[]) => {
        this.eventos = data;
        this.eventsFiltereds = data;
        this.setFilters(data);
      },
      error: () => {
        this.snackbar.open('Error al cargar los eventos', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  selectFilter(id: number, key: FilterKey) {
    if (key in this.selectedFilters) {
      this.selectedFilters[key] = id;
    }
  }

  filterEvents() {
    this.eventsFiltereds = this.eventos.filter((evento) =>
      Object.entries(this.selectedFilters).every(([key, value]) => {
        if (value === 0) return true;
        const prop = evento[key as keyof typeof evento];
        return (
          prop && typeof prop === 'object' && 'id' in prop && prop.id === value
        );
      })
    );
  }

  setFilters(events: EventMF[]) {
    this.eventTypes = this.removeRepeats(events.map((x) => x.eventType));
    this.promotors = this.removeRepeats(events.map((x) => x.promoter));
    this.cities = this.removeRepeats(events.map((x) => x.city));
    this.sponsors = this.removeRepeats(events.map((x) => x.sponsor));
    this.expositors = this.removeRepeats(events.map((x) => x.expositor));
  }

  removeRepeats(array: Array<any>) {
    return array.filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    );
  }
}
