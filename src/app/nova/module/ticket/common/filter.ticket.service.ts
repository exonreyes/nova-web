import {Injectable} from '@angular/core';
import {ObjectEvent} from "@core/util/object.event";
import {FilterTicketCmd} from "@nova/command/filter.ticket.cmd";
import {cleanObjectProperties} from "@core/util/object.util";

export enum FilterKey {
  SEARCH_BY_FOLIO, SEARCH_BY_FILTER,
  REMOVE,
}

@Injectable({
  providedIn: 'root'
})
export class FilterTicketService extends ObjectEvent<FilterKey, FilterTicketCmd> {
  private filter: FilterTicketCmd

  constructor() {
    super()
    this.filter = {page: 0, size: 20}
  }

  update(filter: FilterTicketCmd): void {
    this.filter = filter
    cleanObjectProperties(this.filter)
  }

  setPage(page: number, rows: number): void {
    this.filter.page = page;
    this.filter.size = rows;
  }

  reset() {
    this.filter = {page: 0, size: 20}
  }

  buildFilter() {
    cleanObjectProperties<FilterTicketCmd>(this.filter)
    return this.filter;
  }
}
