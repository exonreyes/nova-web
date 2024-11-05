import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [],
  templateUrl: './phone.component.html',
  styles: ``
})
export class PhoneComponent {
  @Input() phone: string;
}
