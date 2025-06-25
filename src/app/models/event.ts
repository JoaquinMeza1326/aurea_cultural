import { City } from './city';
import { EventType } from './eventType';
import { Expositor } from './expositor';
import { Promoter } from './promoter';
import { Sponsor } from './Sponsor';

export interface EventMF {
  id: number;
  capacity: number;
  startDate: string;
  endDate: string;
  address: string;
  accessCode: string;
  image: string;
  nombre: string;
  descripcion: string;
  city?: City;
  eventType?: EventType;
  promoter?: Promoter;
  sponsor?: Sponsor;
  expositor?: Expositor;
}

export interface EventDto {
  id: number;
  name: string;
  price?: number;
  startDate: string;
  image: string;
  endDate: string;
  descripcion: string;
  ticketTypeId?: number;
  ticketTypeName?: string;
}
