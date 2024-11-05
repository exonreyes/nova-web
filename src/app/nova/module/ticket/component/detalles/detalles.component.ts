import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TicketClipboardService} from "@shared/ticket/ticket-clipboard.service";
import {TicketService} from "@nova/service/ticket.service";
import {ActivityService} from "@nova/service/activity.service";
import {ActivatedRoute} from "@angular/router";
import {TicketModel} from "@nova/model/ticket.model";
import {TicketToolkit} from "@nova/ticket/common/ticket.toolkit";
import {TitleComponent} from "@shared/title/title.component";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {ActivityComponent} from "@shared/activity/activity.component";
import {SeguimientoComponent} from "@nova/ticket/component/seguimiento/seguimiento.component";
import {ErrorHandlerService} from "@shared/error/error-handler.service";
import {Actividad} from "@shared/activity/actividad";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [TitleComponent, ToolbarModule, Button, PanelModule, SpinnerComponent, EditorModule, FormsModule, ActivityComponent, SeguimientoComponent],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit, OnDestroy {
  historial!: Actividad[];
  procesandoHistory: boolean;
  nuevoSeguimiento: boolean;
  protected ticketData!: TicketModel
  protected procesando: boolean = true
  private unsubscribe$: Subject<void>
  private folio: string
  private clipboardService = inject(TicketClipboardService)
  private ticketService = inject(TicketService)
  private activityService = inject(ActivityService)
  private errorHandler = inject(ErrorHandlerService)

  constructor(private route: ActivatedRoute) {
    this.unsubscribe$ = new Subject()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    this.folio = this.route.snapshot.params['folio'];
    this.getDetalles()

  }

  copy() {
    this.clipboardService.buildData(TicketToolkit.createTicketData(this.ticketData))
  }

  cerrarModal($event: { update: boolean }) {
    if ($event.update) {
      this.getDetalles()
    }
    this.nuevoSeguimiento = false
  }

  private getDetalles() {
    this.ticketService.loadDetails(this.folio).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: value => {
        this.ticketData = value.data
        this.procesando = false
        this.obtenerSeguimientos(this.ticketData.id)
      }, error: err => {
        this.errorHandler.notify(err)
        this.procesando = false
      }
    })
  }

  private obtenerSeguimientos(id: number) {
    this.procesandoHistory = true
    this.activityService.load(id).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: value => {
        if (value.data.length > 0) {
          this.historial = value.data
        }
        this.procesandoHistory = false
      }
    })
  }
}
