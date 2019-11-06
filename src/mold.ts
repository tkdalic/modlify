export class Mold<T> {
  private _value: T;

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  constructor(value: T) {
    this._value = value;
  }

  public convert<TResponse, Response extends Mold<TResponse>>(
    converter: (target: T) => Response
  ): Response {
      return converter(this.value)
  }
}
