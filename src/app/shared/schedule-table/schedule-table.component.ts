import {Component, Input} from '@angular/core';
import {ScheduleData} from "@shared/schedule-table/schedule.data";

@Component({
  selector: 'app-schedule-table', standalone: true, imports: [], template: `
    <div class="border-round bg-red-100 text-black-alpha-90 p-3 mb-3 font-medium"><i class="pi pi-info-circle mr-2"></i>Sujeto
      a cambios por días feriados y otros factores
    </div>
    <div class="grid">
      <div class="col-6 font-bold"><label>Operatividad</label></div>
      <div class="col-3 font-bold"><label>Apertura</label></div>
      <div class="col-3 font-bold"><label>Cierre</label></div>
      @for (schedule of data; track schedule.id) {
        <div class="col-6"><label><i class="pi pi-calendar mr-2"></i>{{ schedule.operability }}</label></div>
        <div class="col-3"><label>{{ schedule.open }}</label></div>
        <div class="col-3"><label>{{ schedule.closed }}</label></div>
      }
    </div>
  `, styles: ``
})
export class ScheduleTableComponent {
  @Input() data!: ScheduleData[]
}
