import { Client } from './client';
import { EventMF } from './event';

export interface Favorite {
  id: number;
  client: Client;
  event: EventMF;
}

export interface FavoriteDto {
  id: number;
  eventName: string;
  code: string;
  startDate: string;
  endDate: string;
}

export interface CreateFavoriteDto {
  id?: number;
  client_id: number;
  event_id: number;
}
