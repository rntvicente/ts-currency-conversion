import { HttpClient } from '../../config/http/http-client';
import { Logger } from '../../shared/logger/logger';
import { UnprocessableEntityError } from '../../shared/error/unprocessable-entity-error';

import { CurrencyExchangeRateModel } from '../repository/currency-exchange-rate-model';

import { CalculatePrice } from './calculate-price';
import { CurrencyConversion } from './currency-conversion';

export class CurrencyConversionService implements CurrencyConversion {
  constructor(
    private readonly calculatePriceService: CalculatePrice,
    private readonly httpClient: HttpClient,
    private readonly logger: Logger
  ) {}

  async convert(
    value: number,
    sourceCurrency: string,
    targetCurrency: string
  ): Promise<number> {
    this.logger.info(
      `[SERVICE] calling API to currency conversion ${sourceCurrency}-${targetCurrency}`
    );

    const { data: coin, status } =
      await this.httpClient.get<CurrencyExchangeRateModel>(
        `${process.env.AWESOME_API}/last/${sourceCurrency}-${targetCurrency}`
      );

    if (status !== 200) {
      this.logger.warn(`[SERVICE] fail called API ${JSON.stringify(coin)}`);

      throw new UnprocessableEntityError(
        `currency conversion ${sourceCurrency}-${targetCurrency}`
      );
    }

    this.logger.info(
      `[SERVICE] found coin ${sourceCurrency}-${targetCurrency} ${JSON.stringify(
        coin
      )}`
    );

    const currency = sourceCurrency + targetCurrency;

    return this.calculatePriceService.execute(
      value,
      parseFloat(coin[currency].bid)
    );
  }
}
