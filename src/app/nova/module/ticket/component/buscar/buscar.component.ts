import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {TitleComponent} from "@shared/title/title.component";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {FilterKey, FilterTicketService} from "@nova/ticket/common/filter.ticket.service";

@Component({
  selector: 'buscar-ticket',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogModule, TitleComponent, ReactiveFormsModule, InputTextModule, Button],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {
  @Input() visible: boolean
  @Output() closedComponent = new EventEmitter<void>()
  protected form: FormGroup

  constructor(private builder: FormBuilder, private filter: FilterTicketService) {
    this.form = this.builder.group({
      folio: ['', [Validators.required, Validators.pattern(/^\S*$/)]]
    })
  }

  search() {
    if (this.form.valid) {
      this.filter.update({page: 0, size: 20, folio: this.form.get('folio')?.value || null})
      this.filter.execute(FilterKey.SEARCH_BY_FOLIO, null)
      this.closed()
    }
  }

  closed() {
    this.visible = false
    this.form.reset()
    this.closedComponent.emit()
  }


}
