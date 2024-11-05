import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-spinner', standalone: true, imports: [NgClass], template: `
    <div [ngClass]="{'loading-overlay': modal}">
      <div class="flex flex-column align-items-center my-8">
        <div class="loader"></div>
        <p [ngClass]="{'text-white': modal}" class="my-2 font-medium">{{ message }}</p>
      </div>
    </div>
  `, styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() message: string
  @Input() modal: boolean
}
