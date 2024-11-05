import {Component, Input} from '@angular/core';
import {EditorModule} from "primeng/editor";
import {PrimeTemplate} from "primeng/api";
import {TimelineModule} from "primeng/timeline";
import {FormsModule} from "@angular/forms";
import {Actividad} from './actividad';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [EditorModule, PrimeTemplate, TimelineModule, FormsModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @Input() actividad!: Actividad[]
}
