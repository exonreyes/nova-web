export const UnidadRouter = [{
  path: 'unidad/horario',
  loadComponent: () => import('./horario/horario.component').then(value => value.HorarioComponent)
}]
