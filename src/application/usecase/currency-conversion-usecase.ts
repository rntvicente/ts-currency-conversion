import { Logger } from '../../shared/logger/logger';

import { CoinEntity } from '../../domain/coin-entity';
import { CurrencyConversion } from '../services/currency-conversion';

import { Usecase } from './usecase';

export class CurrencyConversionUsecase implements Usecase {
  constructor(
    private readonly currencyConversionService: CurrencyConversion,
    private readonly logger: Logger
  ) {}

  async execute(price: number): Promise<Record<string, number>> {
    this.logger.info(`[USE CASE] starting currency conversion price ${price}.`);

    const [usdbrl, eurbrl, inrbrl] = await Promise.all([
      this.currencyConversionService.convert(price, 'USD', 'BRL'),
      this.currencyConversionService.convert(price, 'EUR', 'BRL'),
      this.currencyConversionService.convert(price, 'INR', 'BRL'),
    ]);

    const coins = [
      await CoinEntity.create('USD', usdbrl, 15),
      await CoinEntity.create('EUR', eurbrl, 15),
      await CoinEntity.create('INR', inrbrl, 15),
    ];

    const conversionCurrency: Record<string, number> = {};

    for (const coin of coins) {
      conversionCurrency[coin.id] = coin.value;
    }

    return conversionCurrency;
  }
}
