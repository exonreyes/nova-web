import {Subject} from "rxjs";

export class ObjectEvent<T, K> {
  private readonly _subject: Subject<{ key_cmd: T, value: K }>

  constructor() {
    this._subject = new Subject<{ key_cmd: T, value: K }>();
  }

  get subject(): Subject<{ key_cmd: T; value: K }> {
    return this._subject;
  }

  execute(key_cmd: T, value: any) {
    this._subject.next({key_cmd, value});
  }
}
