export class EventEmitter {
  private _events: Map<string, Function[]> = new Map();

  private release(name: string, cb: Function) {
    const callbacks = this._events.get(name);

    if (callbacks) {
      const cbIndex = callbacks.findIndex(
        (c) => c.toString() === cb.toString()
      );

      if (cbIndex >= 0) {
        this._events.set(
          name,
          callbacks.filter((_, index) => cbIndex !== index)
        );
      }
    }
  }

  public subscribe(name: string, cb: Function) {
    const currentListeners = this._events.get(name) ?? [];
    this._events.set(name, currentListeners.concat([cb]));

    return {
      release: () => this.release(name, cb)
    };
  }

  public emit(name: string, ...args: any[]) {
    const values = this._events.get(name);

    if (values) {
      values.forEach((cb) => cb(...args));
    }
  }
}
