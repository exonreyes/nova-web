export interface CreateTicketCmd {
  idReporte: number;
  folio: string;
  descripcion: string;
  agente: string;
  idUnidad: number;
  idEstatus: number;
}
