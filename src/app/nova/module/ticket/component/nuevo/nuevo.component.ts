import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {DialogModule} from "primeng/dialog";
import {TitleComponent} from "@shared/title/title.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule} from "primeng/editor";
import {Button} from "primeng/button";
import {StatusComponent} from "@shared/status/status.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {TicketDataComponent} from "@shared/ticket/ticket.data.component";
import {UnidadModel} from "@nova/model/unidad.model";
import {AreaModel} from "@nova/model/area.model";
import {EstatusModel} from "@nova/model/estatus.model";
import {ReporteModel} from "@nova/model/reporte.model";
import {ModelResponse} from "@nova/model/model.response";
import {forkJoin, Subject, takeUntil} from "rxjs";
import {TicketService} from "@nova/service/ticket.service";
import {ErrorHandlerService} from "@shared/error/error-handler.service";
import {TicketClipboardService} from "@shared/ticket/ticket-clipboard.service";
import {UnitService} from "@nova/service/unit.service";
import {TableEventType, TableTicketService} from "@nova/ticket/service/table.ticket.service";
import {StatusService} from "@nova/service/status.service";
import {AreaService} from "@nova/service/area.service";
import {TicketToolkit} from "@nova/ticket/common/ticket.toolkit";


@Component({
  selector: 'nuevo-ticket',
  standalone: true,
  providers: [ConfirmationService],
  imports: [TitleComponent, DialogModule, ReactiveFormsModule, DropdownModule, EditorModule, Button, ConfirmDialogModule, StatusComponent, SpinnerComponent, InputTextModule, SpinnerComponent, DialogModule, TitleComponent, ReactiveFormsModule, DropdownModule, InputTextModule, EditorModule, Button, StatusComponent, ConfirmDialogModule, TicketDataComponent],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})
export class NuevoComponent implements OnInit, OnDestroy {

  @Input() visible: boolean
  @Output() closedComponent = new EventEmitter<void>()
  editFolio: boolean
  guardando: boolean;
  protected form: FormGroup;
  protected unidades!: UnidadModel[]
  protected areas!: AreaModel[]
  protected estatus: EstatusModel[]
  protected reportes: ReporteModel[];
  protected resultData!: ModelResponse;
  private unsubscribe$: Subject<void>

  private ticketService = inject(TicketService)
  private errorService = inject(ErrorHandlerService)
  private copyService = inject(TicketClipboardService)
  private unidadService = inject(UnitService)
  private confirmService = inject(ConfirmationService)
  private tableEvent = inject(TableTicketService)
  private statusService = inject(StatusService)
  private areaService = inject(AreaService)

  constructor(private builder: FormBuilder) {
    this.form = this.builder.group({
      unidad: [null, Validators.required],
      area: [null, Validators.required],
      reporte: [null, Validators.required],
      agente: [null],
      estatus: [null, Validators.required],
      nota: [null],
      folio: [{value: null, disabled: true}, [Validators.required, Validators.pattern(/^\S*$/)]]
    })
    this.unsubscribe$ = new Subject<void>();

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    this.getDependencies()
    this.trackAreaChanges()
  }

  closed() {
    this.closedComponent.emit()
  }

  register() {
    if (this.form.valid) {
      this.guardando = true;
      this.ticketService.create(TicketToolkit.createTicketCmd(this.form.value)).pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: value => {
            this.guardando = false
            this.resultData = value
            this.checkContinue()
          }, error: error => {
            this.guardando = false
            this.errorService.notify(error)
          }
        });
    }

  }

  defaultForm($event: boolean) {
    if ($event == false) {
      this.resetForm()
    }
  }

  copy() {
    let data = this.resultData.data
    data.agente = this.form.get('agente')?.value;
    this.copyService.copy(this.resultData.data)
  }

  private resetForm() {
    this.form.patchValue({
      unidad: null, area: null, reporte: null, agente: null, estatus: null, nota: null, folio: null
    });
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
      }
    });
  }

  private getDependencies() {
    forkJoin({
      unidades: this.unidadService.loadUnitBusiness(),
      estatus: this.statusService.loadStatus(),
      areas: this.areaService.loadAreasWithReports()
    }).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: ({unidades, estatus, areas}) => {
        this.unidades = unidades.data;
        this.estatus = estatus.data;
        this.areas = areas.data;
      }, error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  private trackAreaChanges() {
    this.form.get('area')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        if (value) {
          this.updateReportes(value);
        } else {
          this.reportes = []
        }
      });
  }

  private updateReportes(value: AreaModel) {
    this.cambiarEstadoCampoFolio(value.id);
    this.form.get('reporte')?.reset();
    this.form.get('reporte').markAsUntouched()
    this.form.get('reporte').markAsPristine()
    this.reportes = value.reportes;

  }

  private cambiarEstadoCampoFolio(idArea: number): void {
    if (idArea === 1 || idArea === 2 || idArea === 3) {
      this.form.get('folio').enable({onlySelf: true, emitEvent: true});
      this.editFolio = true
    } else {
      this.editFolio = false
      this.form.get('folio').disable({onlySelf: true, emitEvent: true});
      this.form.patchValue({folio: null}); // Limpiar el campo si se deshabilita
    }
  }

  private checkContinue() {
    this.visible = false
    this.tableEvent.execute(TableEventType.UPDATE, null)
    this.confirmService.confirm({

      header: 'Proceso completado', message: 'Desea registrar o generar otro ticket?', accept: () => {
        this.resetForm()
        this.visible = true
      }, reject: () => {
        this.resetForm()
        this.closed()
      }
    });
  }
}
