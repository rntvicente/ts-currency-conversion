import { Logger } from '../../shared/logger/logger';

import { CoinEntity } from '../../domain/coin-entity';
import { CurrencyConversion } from '../services/currency-conversion';

import { Usecase } from './usecase';

export class CurrencyConversionUsecase implements Usecase {
  constructor(
    private readonly currencyConversionService: CurrencyConversion,
    private readonly logger: Logger
  ) {}

  async execute({ price, coin }: Input): Promise<Record<string, number>> {
    this.logger.info(
      `[USE CASE] starting currency conversion ${coin} price ${price}.`
    );

    const [usdbrl, eurbrl, inrbrl] = await Promise.all([
      this.currencyConversionService.convert(price, 'USD', coin),
      this.currencyConversionService.convert(price, 'EUR', coin),
      this.currencyConversionService.convert(price, 'INR', coin),
    ]);

    const coins = [
      await CoinEntity.create('USD', usdbrl, 15),
      await CoinEntity.create('EUR', eurbrl, 15),
      await CoinEntity.create('INR', inrbrl, 15),
    ];

    const conversionCurrency: Record<string, number> = {};

    for (const item of coins) {
      conversionCurrency[item.id] = item.value;
    }

    return conversionCurrency;
  }
}

export type Input = {
  coin: string;
  price: number;
};
