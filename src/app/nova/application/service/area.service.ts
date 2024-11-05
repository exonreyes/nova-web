import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {Observable, of, tap} from "rxjs";
import {ModelResponse} from "@nova/model/model.response";

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private header: HttpHeaders;
  private areaApiUrl  = environment.hostBackend + "/area";
  private reportApiUrl = environment.hostBackend + "/area/reportes";
  private areasCache?: ModelResponse;
  private reportsCache?: ModelResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }

  loadAreas(): Observable<ModelResponse> {
    if (this.areasCache) {
      return of(this.areasCache);
    }
    return this.httpClient.get<ModelResponse>(this.areaApiUrl , {headers: this.header})
      .pipe(tap(data => this.areasCache = data))
  }

  loadAreasWithReports(): Observable<ModelResponse> {
    if (this.reportsCache) {
      return of(this.reportsCache);
    }
    return this.httpClient.get<ModelResponse>(this.reportApiUrl, {headers: this.header})
      .pipe(tap(data => this.reportsCache = data))
  }
}
