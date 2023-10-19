import { Logger } from '../../shared/logger/logger';

import { CoinEntity } from '../../domain/coin-entity';
import { CurrencyConversion } from '../services/currency-conversion';
import { CalculateDiscountHandler } from '../../application/services/calculate-discount-handler';

import { Usecase } from './usecase';

export class CurrencyConversionUsecase implements Usecase {
  constructor(
    private readonly calculateDiscountHandle: CalculateDiscountHandler,
    private readonly currencyConversionService: CurrencyConversion,
    private readonly logger: Logger
  ) {}

  async execute({ price, coin }: Input): Promise<Record<string, number>> {
    this.logger.info(
      `[USE CASE] starting currency conversion ${coin} price ${price}.`
    );

    const priceDiscount = this.calculateDiscountHandle.calculate(price);

    const [usdbrl, eurbrl, inrbrl] = await Promise.all([
      this.currencyConversionService.convert(priceDiscount, 'USD', coin),
      this.currencyConversionService.convert(priceDiscount, 'EUR', coin),
      this.currencyConversionService.convert(priceDiscount, 'INR', coin),
    ]);

    const coins = [
      await CoinEntity.create('USD', usdbrl),
      await CoinEntity.create('EUR', eurbrl),
      await CoinEntity.create('INR', inrbrl),
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
