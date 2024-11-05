import {UnidadModel} from "@nova/model/unidad.model";

export interface HorarioModel {
  unidad: UnidadModel,
  horario: {
    id: number, apertura: string, cierre: string
  }
}

