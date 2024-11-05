import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {Observable, of, tap} from "rxjs";
import {ModelResponse} from "@nova/model/model.response";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly header: HttpHeaders;
  private statusApiURL = environment.hostBackend + "/estatus"
  private status: ModelResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
    this.loadStatusLocalStorage()
  }

  loadStatus(): Observable<ModelResponse> {
    return this.status ? of(this.status) : this.httpClient.get<ModelResponse>(this.statusApiURL, {headers: this.header})
      .pipe(tap(data => {
        localStorage.setItem("estatus", JSON.stringify(data));
        return this.status = data;
      }));
  }

  private loadStatusLocalStorage() {
    let data = localStorage.getItem("estatus")
    if (data != null) {
      this.status = JSON.parse(data);
    }
  }
}
