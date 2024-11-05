import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EstatusModel} from "@nova/model/estatus.model";
import {ActivityService} from "@nova/service/activity.service";
import {MessageService} from "primeng/api";
import {StatusService} from "@nova/service/status.service";
import {TicketToolkit} from "@nova/ticket/common/ticket.toolkit";
import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {DialogModule} from "primeng/dialog";
import {TitleComponent} from "@shared/title/title.component";
import {DropdownModule} from "primeng/dropdown";
import {EditorModule} from "primeng/editor";
import {Button} from "primeng/button";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-nuevo-seguimiento',
  standalone: true,
  imports: [SpinnerComponent, DialogModule, TitleComponent, ReactiveFormsModule, DropdownModule, EditorModule, Button],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.scss'
})
export class SeguimientoComponent implements OnInit, OnDestroy {
  @Input('id-ticket') idTicket: number
  @Output() closed = new EventEmitter<{ update: boolean }>();
  @Input() visible = false
  protected form!: FormGroup;
  protected estatus!: EstatusModel[]
  protected guardando: boolean
  protected success: boolean
  private unsubscribe$: Subject<void>

  constructor(private builder: FormBuilder, private createService: ActivityService, private estatusService: StatusService, private messageService: MessageService) {
    this.unsubscribe$ = new Subject()
    this.form = this.builder.group({
      agente: [null], estatus: [null, Validators.required], descripcion: [null],
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    this.loadStatus()
  }

  registrar() {
    this.visible = false
    this.guardando = true
    if (this.form.valid) {
      this.createService.create(TicketToolkit.createActivityCmd(this.idTicket, this.form.value)).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: value => {
          this.closed.emit({update: true})
          this.visible = false
          this.guardando = false;
          this.messageService.add({
            summary: 'Completado', detail: 'SeguimientoData registrado', life: 6000, severity: 'success'
          })
        }
      })
    }
  }

  defaultForm($event: boolean) {
    if ($event == false) {
      this.visible = false
      this.closed.emit({update: false})
      debugger
    }
  }

  private loadStatus() {
    this.estatusService.loadStatus().pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.estatus = value.data;
    })
  }
}
