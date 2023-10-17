import { Logger } from '../logger/logger';
import { InvalidFieldError } from '../error/invalid-field.error';

export class CoinVO {
  private _identity: string;
  private _exchange: number;

  constructor(
    identity: string,
    exchange: number,
    private readonly logger: Logger
  ) {
    this._identity = identity;
    this._exchange = exchange;
    this.validate();
  }

  private validate(): void {
    if (this._identity.length !== 3) {
      this.logger.warn(`Identificador de moeda inválido`);
      throw new InvalidFieldError('identity');
    }

    if (this._exchange < 0) {
      this.logger.warn('Câmbio de moeda inválido');
      throw new InvalidFieldError('exchange');
    }
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
