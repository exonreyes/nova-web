import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-status', standalone: true, imports: [NgClass, NgOptimizedImage], template: `
    <div class="flex flex-column align-items-center mt-5">
      <img [ngSrc]="icon" alt="icon" height="40" width="40">
      <p [ngClass]="title?.color" class="text-xl font-semibold">{{ title.text }}</p>
      <span class="text-color-secondary text-lg font-medium">{{ description }}</span>
      <ng-content></ng-content>
    </div>
  `, styles: ``
})
export class StatusComponent {
  @Input('icon-src') icon: string
  @Input() title: { text: string, color?: string };
  @Input() description?: string
}
