export interface PurcharsedTicket {
  id: number;
  purchasePrice: number;
  purchaseDate: string;
  ticketType_id?: number;
  transaction_id?: number;
}
