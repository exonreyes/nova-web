import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ModelResponse} from "@nova/model/model.response";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private createApiURL = environment.hostBackend + "/seguimiento";
  private activityApiURL = environment.hostBackend + "/seguimiento";
  private readonly header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
  }

  create(params) {
    return this.httpClient.post<ModelResponse>(this.createApiURL, params, {headers: this.header})
  }

  load(idTicket: number) {
    return this.httpClient.get<ModelResponse>(this.activityApiURL, {
      headers: this.header, params: {idTicket: idTicket}
    })
  }
}
