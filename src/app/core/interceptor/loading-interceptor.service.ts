import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoadingService} from "./loading.service";

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true);
    return next.handle(req).pipe(tap({
      next: () => {
        this.loadingService.setLoading(false);
        console.log(req)
      }, error: () => this.loadingService.setLoading(false)
    }));
  }
}
