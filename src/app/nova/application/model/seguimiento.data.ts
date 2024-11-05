import {EstatusModel} from "./estatus.model";

export interface SeguimientoData {
  id?: number;
  estatus?: EstatusModel;
  agente?: string;
  creado?: string;
  actualizado?: string
  descripcion?: string;
}
