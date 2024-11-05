import {Injectable} from '@angular/core';
import {ObjectEvent} from "@core/util/object.event";

export enum TableEventType {
  UPDATE,
}

@Injectable({
  providedIn: 'root'
})
export class TableTicketService extends ObjectEvent<TableEventType, void> {

  constructor() {
    super()
  }
}
