import { InvalidFieldError } from "../error/invalid-field.error";

export class CoinVO {
  private _identity: string;
  private _exchange: number;

  constructor(readonly identity: string, readonly exchange: number) {
    this._identity = identity;
    this._exchange = exchange;
    this.validate();
  }

  validate(): void {
    if (this._identity.length !== 3) throw new InvalidFieldError("identity");
    if (this._exchange < 0) throw new InvalidFieldError("exchange");
  }
}
