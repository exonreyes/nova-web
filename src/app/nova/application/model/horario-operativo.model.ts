import {OperatividadModel} from "@nova/model/operatividad.model";
import {HorarioModel} from "@nova/model/horario.model";

export interface HorarioOperativo {
  operatividad: OperatividadModel,
  horarios: HorarioModel[]
}
