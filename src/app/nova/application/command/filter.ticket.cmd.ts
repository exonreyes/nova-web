export interface FilterTicketCmd {
  idArea?: number;
  folio?: string;
  idUnidad?: number;
  idStatus?: number
  size: number;
  page: number;
  desde?: string;
  hasta?: string;
}
