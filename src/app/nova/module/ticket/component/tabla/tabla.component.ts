import {Component, OnDestroy, OnInit} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {Table, TableModule} from "primeng/table";
import {InputIconModule} from "primeng/inputicon";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {StatusComponent} from "@shared/status/status.component";
import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {PageData} from "@core/util/page.data";
import {TicketModel} from "@nova/model";
import {Subject, takeUntil} from "rxjs";
import {FilterTicketService} from "@nova/ticket/common/filter.ticket.service";
import {ErrorHandlerService} from "@shared/error/error-handler.service";
import {TicketService} from "@nova/service/ticket.service";
import {TicketClipboardService} from "@shared/ticket/ticket-clipboard.service";
import {TableTicketService} from "@nova/ticket/service/table.ticket.service";
import {TicketToolkit} from "@nova/ticket/common/ticket.toolkit";


@Component({
  selector: 'tabla-ticket',
  standalone: true,
  imports: [TableModule, IconFieldModule, InputIconModule, Button, RouterLink, StatusComponent, SpinnerComponent, PaginatorModule, InputTextModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit, OnDestroy {
  protected pageTicket: PageData = {rows: 20, totalRecords: 0, loading: true, first: 0}
  protected dataTickets: TicketModel[] = [];
  private unsubscribe$: Subject<void>

  constructor(private filterService: FilterTicketService, private errorManager: ErrorHandlerService, private ticketService: TicketService, private clipboardService: TicketClipboardService, private tableService: TableTicketService) {
    this.unsubscribe$ = new Subject<void>()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    this.filterEventListener()
    this.tableEventListener()
    this.loadDataTickets()
  }

  copyDataTicket(row: any) {
    this.clipboardService.copy(TicketToolkit.createTicketData(row))
  }

  syncData(dt: Table, iFilterResult: HTMLInputElement) {
    iFilterResult.value = ''
    dt.clear()
    this.resetPage()
    this.loadDataTickets()
  }

  onPageChange($event: PaginatorState) {
    this.pageTicket.first = $event.first
    this.pageTicket.rows = $event.rows
    this.filterService.setPage($event.page, this.pageTicket.rows)
    this.loadDataTickets()
  }

  private loadDataTickets() {
    this.ticketService.loadTicket(this.filterService.buildFilter())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: value => {
          this.dataTickets = value.data || [];
          this.pageTicket.totalRecords = value.meta.page.totalElements
          this.pageTicket.loading = false
        }, error: err => {
          this.pageTicket.loading = false
          this.errorManager.notify(err)
        }
      })
  }

  private resetPage() {
    this.dataTickets = []
    this.pageTicket = {rows: 20, totalRecords: 0, first: 0, loading: true}
  }

  private filterEventListener() {
    this.filterService.subject.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: value => {
        this.resetPage()
        this.loadDataTickets()
      }
    })
  }

  private tableEventListener() {
    this.tableService.subject.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: value => this.loadDataTickets()
    })
  }
}
