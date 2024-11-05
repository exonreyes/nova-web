export const ticketRouter = [{
  path: 'ticket/:folio',
  loadComponent: () => import('@nova/ticket/component/detalles/detalles.component').then(value => value.DetallesComponent)
}]
