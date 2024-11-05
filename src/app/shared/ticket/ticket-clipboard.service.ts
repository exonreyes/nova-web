import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";
import {ClipboardNotify, ClipboardService} from "@core/clipboard/clipboard.service";
import {TicketData} from "./ticket.data";

@Injectable({
  providedIn: 'root'
})
export class TicketClipboardService extends ClipboardService<TicketData> {
  constructor(private message: MessageService) {
    super()
    this.addEventListener()
  }

  override buildData(data: TicketData): string {
    const agenteStr = data.agente ? `Agente: ${data.agente}` : '';
    return `== REPORTE | ${data.area.toUpperCase()} ==
    \nUnidad: ${data.unidad}\n
    Tipo: ${data.reporte}\n
    Folio: ${data.folio}\n
    Estado: ${data.estatus}\n
    ${agenteStr}`;
  }

  private addEventListener() {
    this.subject.subscribe({
      next: value => {
        if (value.key_cmd === ClipboardNotify.copy_success) {
          this.message.add({
            life: 6000, summary: 'Copiar', detail: 'Reporte copiado', severity: 'info'
          })
        } else {
          this.message.add({
            life: 6000, summary: 'Copiar', detail: 'Error al copiar el reporte', severity: 'error'
          })
        }
      }
    })
  }
}
