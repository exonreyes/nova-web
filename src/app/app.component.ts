import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoadingService} from "@core/interceptor/loading.service";
import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {ToastModule} from "primeng/toast";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoadingInterceptorService} from "@core/interceptor/loading-interceptor.service";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, ToastModule, SpinnerComponent],
  providers: [LoadingService, {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true}],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(private config: PrimeNGConfig, private loadingService: LoadingService) {
  }

  ngOnInit() {
    // Usar window.onload para detectar cuando la página ha cargado completamente
    window.onload = () => {
      this.loadingService.setLoading(false);
    };
    // Suscribirse al estado de carga del servicio de carga
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.initTraslation()
  }

  private initTraslation() {
    this.config.setTranslation({
      emptyFilterMessage: 'No se han encontrado resultados',
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      accept: 'Aceptar',
      reject: 'Cancelar',
      apply: 'Aplicar',
      emptyMessage: 'No hay opciones disponibles',
      clear: 'Limpiar',
      today: 'Hoy'
    });
  }
}
