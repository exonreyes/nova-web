import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {ModelResponse} from "@nova/model/model.response";
import {CreateTicketCmd} from "@nova/command/create.ticket.cmd";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly header: HttpHeaders;
  private detailsApiURL = environment.hostBackend + "/ticket/detalles"
  private ticketsApiURL = environment.hostBackend + "/ticket"
  private createTicketApiURL = environment.hostBackend + "/ticket/nuevo"

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }

  create(command: CreateTicketCmd) {
    return this.httpClient.post<ModelResponse>(this.createTicketApiURL, command, {headers: this.header})
  }

  loadTicket(filter) {
    return this.httpClient.get<ModelResponse>(this.ticketsApiURL, {headers: this.header, params: filter})
  }

  loadDetails(folio) {
    return this.httpClient.get<ModelResponse>(this.detailsApiURL, {headers: this.header, params: {folio: folio}})
  }
}
