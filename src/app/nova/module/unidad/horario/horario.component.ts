import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScheduleService} from "@nova/service/schedule.service";
import {Subject, takeUntil} from "rxjs";
import {TitleComponent} from "@shared/title/title.component";
import {PanelModule} from "primeng/panel";
import {TableModule} from "primeng/table";
import {HorarioOperativo} from "@nova/model";


@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [TitleComponent, PanelModule, TableModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.scss'
})
export class HorarioComponent implements OnInit, OnDestroy {
  protected operatividad!: HorarioOperativo[]
  protected horarios
  private operatividadService = inject(ScheduleService)
  private unsubscribe$: Subject<void>

  constructor() {
    this.unsubscribe$ = new Subject<void>()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    this.loadSchedule()
  }

  private loadSchedule() {
    this.operatividadService.loadSchedules().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: value => {
        this.operatividad = value.data
        this.horarios = this.operatividad[0]
        debugger
      }
    })
  }
}

