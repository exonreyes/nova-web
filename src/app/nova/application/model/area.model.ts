import {ReporteModel} from "./reporte.model";

export interface AreaModel {
  id?: number;
  nombre?: string;
  reportes?: ReporteModel[];
}
