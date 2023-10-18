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
    try {
      this.logger.info(
        `[SERVICE] calling API to currency conversion ${sourceCurrency}-${targetCurrency}`
      );

      const { data: coin } =
        await this.httpClient.get<CurrencyExchangeRateModel>(
          `${process.env.AWESOME_API}/last/${sourceCurrency}-${targetCurrency}`
        );

      this.logger.info(
        `[SERVICE] found coin ${sourceCurrency}-${targetCurrency} ${JSON.stringify(
          coin
        )}`
      );

      return this.calculatePriceService.execute(value, parseFloat(coin.bid));
    } catch (error) {
      this.logger.error(
        `[SERVICE] fail called API to currency conversion ${sourceCurrency}-${targetCurrency} - ${error.message}`
      );

      throw new UnprocessableEntityError(error.message);
    }
  }
}
