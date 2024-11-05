import {TicketModel} from "@nova/model/ticket.model";
import {TicketData} from "@shared/ticket/ticket.data";
import {CreateTicketCmd} from "@nova/command/create.ticket.cmd";
import {CreateActivityCmd} from "@nova/command/create.activity.cmd";

export abstract class TicketToolkit {

  static createTicketData(data: TicketModel): TicketData {
    return {
      id: data.id,
      creado: data.creado,
      unidad: data.unidad.id + ' ' + data.unidad.nombre,
      estatus: data.estatus.nombre,
      folio: data.folio,
      area: data.area.nombre,
      agente: data.agente,
      reporte: data.reporte.nombre
    }
  }

  static createTicketCmd({unidad, folio, reporte, estatus, agente, nota}): CreateTicketCmd {
    return {
      idReporte: reporte.id, idUnidad: unidad.id, folio: folio, descripcion: nota, idEstatus: estatus.id, agente: agente
    }
  }

  static createActivityCmd(idTicket: number, {agente, estatus, descripcion}): CreateActivityCmd {
    return {
      idTicket: idTicket ? idTicket : null, idEstatus: estatus.id, agente: agente, descripcion: descripcion
    }
  }
}
