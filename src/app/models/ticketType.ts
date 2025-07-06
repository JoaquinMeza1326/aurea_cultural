import { EventMF } from './event';

export interface TicketType {
  id: number;
  name: string;
  price: number;
  availableQuantity: number;
  event: EventMF;
  event_id?: number;
}

export interface TicketTypeDto {
  id: number;
  name: string;
  price: number;
  availableQuantity: number;
  startDate: string;
  endDate: string;
}
