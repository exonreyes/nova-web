import {Component} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {TitleComponent} from "@shared/title/title.component";
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {TablaComponent} from "@nova/ticket/component/tabla/tabla.component";
import {NuevoComponent} from "@nova/ticket/component/nuevo/nuevo.component";
import {SpinnerComponent} from "@shared/spinner/spinner.component";
import {BuscarComponent} from "@nova/ticket/component/buscar/buscar.component";
import {FiltroComponent} from "@nova/ticket/component/filtro/filtro.component";
import {PanelModule} from "primeng/panel";
import {FilterKey, FilterTicketService} from "@nova/ticket/common/filter.ticket.service";

@Component({
  imports: [TitleComponent, ToolbarModule, Button, TablaComponent, NuevoComponent, SpinnerComponent, BuscarComponent, FiltroComponent, PanelModule],
  selector: 'app-ticket',
  styleUrl: './ticket.component.scss',
  standalone: true,
  templateUrl: './ticket.component.html'
})
export class TicketComponent {
  openNew: boolean;
  openSearch: boolean;
  openFilter: boolean
  filtroActivo: boolean;
  private unsubscribe$: Subject<void>

  constructor(private filterService: FilterTicketService) {
    this.unsubscribe$ = new Subject()
    this.filterService.subject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: value => {
          switch (value.key_cmd) {
            case FilterKey.SEARCH_BY_FILTER:
              this.filtroActivo = true;
              break;
            default:
              this.filtroActivo = false
          }
        }
      })
  }
}
