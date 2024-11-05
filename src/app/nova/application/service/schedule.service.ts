import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {Observable, of, tap} from "rxjs";
import {ModelResponse} from "@nova/model/model.response";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly header: HttpHeaders;

  private operationApiURL = environment.hostBackend + "/horario"
  private operationBusinessApiURL = environment.hostBackend + "/horario/unidad";
  private operatividadCache: ModelResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }

  loadSchedules(): Observable<ModelResponse> {
    if (this.operatividadCache) {
      return of(this.operatividadCache);
    } else {
      return this.httpClient.get<ModelResponse>(this.operationApiURL, {headers: this.header}).pipe(tap(data => this.operatividadCache = data))
    }
  }

  loadSchedulesByUnitBusiness(uidBuss: number): Observable<ModelResponse> {
    return this.httpClient.get<ModelResponse>(this.operationBusinessApiURL, {
      headers: this.header, params: {idUnidad: uidBuss}
    })
  }
}
