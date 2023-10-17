import { InvalidFieldError } from "../error/invalid-field.error";

export class CoinVO {
  private _identity: string;
  private _exchange: number;

  constructor(identity: string, exchange: number) {
    this._identity = identity;
    this._exchange = exchange;
    this.validate();
  }

  private validate(): void {
    if (this._identity.length !== 3) throw new InvalidFieldError("identity");
    if (this._exchange < 0) throw new InvalidFieldError("exchange");
  }

  get identity() {
    return this._identity;
  }

  get exchange() {
    return this._exchange;
  }

  get toString() {
    return `${this._identity} - ${this._exchange}`;
  }
}
