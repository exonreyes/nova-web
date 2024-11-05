import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-data-info', standalone: true, imports: [], template: `
    <div class="flex gap-2">
      <i class="pi mt-1" [className]="icon"></i>
      <div class="flex flex-column">
        <div class="text-color-secondary">Telefono</div>
        <p class="font-medium">{{ data }}</p>
      </div>
    </div>
  `, styles: ``
})
export class DataInfoComponent {
  @Input() data: { title: string; value: string }
  @Input('icon-class') icon: string
}
