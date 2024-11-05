import {Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {ticketRouter} from "@nova/ticket/ticket.router";

export const routes: Routes = [{
  path: '', component: AppLayoutComponent, children: [{
    path: '', loadComponent: () => import("./dashboard/dashboard.component").then(value => value.DashboardComponent)
  }, {
    path: 'ticket', loadComponent: () => import("@nova/ticket/ticket.component").then(value => value.TicketComponent)
  }, {
    path: 'unidad/horario',
    loadComponent: () => import("@nova/unidad/horario/horario.component").then(value => value.HorarioComponent)
  }, ...ticketRouter,]
}]

