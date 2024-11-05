import {ReporteModel} from "./reporte.model";
import {UnidadModel} from "./unidad.model";
import {AreaModel} from "./area.model";
import {EstatusModel} from "./estatus.model";


export interface TicketModel {
  id: number;
  folio: string;
  unidad?: UnidadModel;
  reporte?: ReporteModel;
  area?: AreaModel;
  creado?: string;
  estatus?: EstatusModel;
  descripcion?: string;
  agente?: string;
}
