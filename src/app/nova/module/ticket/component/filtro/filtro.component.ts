import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TitleComponent} from "@shared/title/title.component";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {PanelModule} from "primeng/panel";
import {SidebarModule} from "primeng/sidebar";
import {AreaModel, EstatusModel, UnidadModel} from "@nova/model";
import {forkJoin, Subject, takeUntil} from "rxjs";
import {FilterKey, FilterTicketService} from "@nova/ticket/common/filter.ticket.service";
import {UnitService} from "@nova/service/unit.service";
import {StatusService} from "@nova/service/status.service";
import {AreaService} from "@nova/service/area.service";
import {ErrorHandlerService} from "@shared/error/error-handler.service";
import {filter} from "rxjs/operators";
import {FilterTicketCmd} from "@nova/command/filter.ticket.cmd";
import {endOfDay, formatNovaDate} from "@core/util/date.util";


@Component({
  selector: 'filtro-ticket',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, CalendarModule, DropdownModule, PanelModule, SidebarModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent implements OnDestroy, OnInit {
  @Input() visible: boolean
  @Output() closedComponent = new EventEmitter<void>()
  unidades: UnidadModel[]
  areas: AreaModel[]
  estatus: EstatusModel[]
  protected form: FormGroup
  protected hoy: Date = new Date()
  private unsubscribe$: Subject<void>

  constructor(private filter: FilterTicketService, private unidadService: UnitService, private estatusService: StatusService, private areaService: AreaService, private formBuilder: FormBuilder, private errorService: ErrorHandlerService) {
    this.unsubscribe$ = new Subject()
    this.form = this.formBuilder.group({
      unidad: null, estatus: null, desde: null, hasta: null, area: null
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    this.getDependencies()
    this.tableTicketListener();

  }

  clearFilter() {
    this.form.reset()
    this.searchByFilter()
    this.filter.execute(FilterKey.REMOVE, null)
  }

  closed() {
    this.visible = false
    this.closedComponent.emit()
  }

  searchByFilter() {
    this.filter.update(this.loadFilter())
    this.filter.execute(FilterKey.SEARCH_BY_FILTER, null)
  }

  tableTicketListener(): void {
    this.filter.subject.pipe(takeUntil(this.unsubscribe$), filter(value => value?.key_cmd === FilterKey.SEARCH_BY_FOLIO))
      .subscribe({next: (): void => this.resetDataForm()})
  }

  resetDataForm(): void {
    this.closedComponent.emit()
    this.form.reset();
  }

  getDependencies() {
    forkJoin({
      units: this.unidadService.loadUnitBusiness(),
      status: this.estatusService.loadStatus(),
      areas: this.areaService.loadAreas()
    }).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: ({units, status, areas}) => {
        this.unidades = units.data;
        this.estatus = status.data;
        this.areas = areas.data;
      }, error: err => {
        this.errorService.notify(err)
      }
    })
  }

  private loadFilter(): FilterTicketCmd {
    const {unidad, area, estatus, desde, hasta} = this.form.value
    return {
      idUnidad: unidad?.id ?? null,
      idStatus: estatus?.id ?? null,
      idArea: area?.id ?? null,
      hasta: hasta ? formatNovaDate(endOfDay(hasta)) : null,
      desde: formatNovaDate(desde),
      page: 0,
      size: 20
    }
  }
}
