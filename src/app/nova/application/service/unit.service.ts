import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {of, tap} from "rxjs";
import {ModelResponse} from "@nova/model/model.response";

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private readonly header: HttpHeaders;
  private businessApiURL = environment.hostBackend + "/unidad"
  private contactApiURL = environment.hostBackend + "/unidad/contacto"
  private data!: ModelResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
    this.loadLocaStorage()
  }

  loadUnitBusiness() {
    if (this.data) {
      return of(this.data);
    } else {
      return this.httpClient.get<ModelResponse>(this.businessApiURL, {headers: this.header})
        .pipe(tap(data => {
          localStorage.setItem("units", JSON.stringify(data));
          return this.data = data;
        }));
    }
  }

  loadContact(idUnitBusiness: number) {
    return this.httpClient.get<ModelResponse>(this.contactApiURL, {
      headers: this.header, params: {idUnidad: idUnitBusiness}
    })
  }

  private loadLocaStorage() {
    let data = localStorage.getItem("units")
    if (data != null) {
      this.data = JSON.parse(data)
    }
  }
}
