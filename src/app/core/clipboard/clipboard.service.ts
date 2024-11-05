import {Injectable} from '@angular/core';
import {ObjectEvent} from "@core/util/object.event";

export enum ClipboardNotify {
  copy_success, copy_error
}

@Injectable({
  providedIn: 'root'
})
export abstract class ClipboardService<T> extends ObjectEvent<ClipboardNotify,any> {
  constructor() {
    super()
  }

  abstract buildData(data: T): string

  copy(data: T) {
    if (navigator.clipboard) {
      this.copyData(this.buildData(data))
    } else {
      this.obsoleteCopy(this.buildData(data))
    }
  }

  // Solución de retroceso para navegadores que no soportan Clipboard API
  private obsoleteCopy(data: string): void {
    const tempElement = document.createElement('textarea');
    tempElement.value = data
    document.body.appendChild(tempElement);
    tempElement.select();
    try {
      document.execCommand('copy');
      this.execute(ClipboardNotify.copy_success, data);
    } catch (err) {
      this.execute(ClipboardNotify.copy_error, err);
    }
    document.body.removeChild(tempElement);
  }

  private copyData(data: string): void {
    navigator.clipboard.writeText(data).then(() => {
      this.execute(ClipboardNotify.copy_success, null);
    }, (err) => {
      this.execute(ClipboardNotify.copy_error, err);
    });
  }
}
