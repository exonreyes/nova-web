import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [NgOptimizedImage, NgClass],
  templateUrl: './title.component.html',
  styles: ``
})
export class TitleComponent {
  @Input() title: string;
  @Input() description?: string;
  @Input('icon-src') icon: string
  @Input('background') background?: string = 'bg-white'
  @Input('padding') padding?: string = 'p-1'
}
