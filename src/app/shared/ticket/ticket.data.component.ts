import {Component, Input} from '@angular/core';
import {TicketData} from "./ticket.data";

@Component({
  selector: 'app-ticket', standalone: true, imports: [], template: `
    <div class="flex flex-column align-items-center py-3 px-8">
      <div class="border-bottom-1 w-3rem text-color-secondary mb-4"></div>
      <div class="font-bold">REPORTE | {{ ticket.area.toUpperCase() }}</div>
      <div>{{ ticket.reporte }}</div>
      <div class="text-red-600 font-bold mt-3">{{ ticket.folio }}</div>
      <div>{{ ticket.estatus }}</div>
      <div class="font-bold mt-3">{{ ticket.unidad }}</div>
      @if (ticket.agente) {
        <div>{{ ticket.agente }}</div>
      }
      <div class="text-color-secondary text-sm mt-5">Creado el {{ ticket.creado }}</div>
    </div>
  `, styles: ``
})
export class TicketDataComponent {
  @Input() ticket: TicketData | null = null;
}
