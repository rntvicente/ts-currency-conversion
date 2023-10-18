import { InvalidFieldError } from '../shared/error/invalid-field.error';

export class CoinEntity {
  constructor(
    readonly id: string,
    readonly value: number,
    readonly discount: number,
    readonly createAt: Date
  ) {}

  static async create(
    id: string,
    value: number,
    discount: number
  ): Promise<CoinEntity> {
    if (id.length !== 3) throw new InvalidFieldError('id');

    return new CoinEntity(id, value, discount, new Date());
  }
}
