import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {
  }

  notify(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.messageService.add({
        life: 10000,
        severity: 'error',
        summary: 'Error de conexión',
        detail: 'No se pudo obtener conexión con el servidor'
      });
    } else {
      this.messageService.add({
        life: 7000, severity: 'error', summary: error.error.code + ': No se pudo procesar', detail: error.error.message
      });
    }
  }
}
