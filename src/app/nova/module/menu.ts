export const menu = [{
  label: 'Principal', items: [{label: 'Dashboard', icon: 'nova n-dashboard', routerLink: ['/']}]
}, {
  label: 'Gestión TI', items: [{label: 'Tickets', icon: 'nova n-documents', routerLink: ['/ticket']}, {
    label: 'Unidad', icon: 'nova n-company', items: [{
      label: 'Apertura y cierre', icon: 'nova n-schedule', routerLink: ['unidad/horario']
    }, {
      label: 'Generales', icon: 'nova n-analytics', routerLink: ['/horario']
    }]
  }]
}];
