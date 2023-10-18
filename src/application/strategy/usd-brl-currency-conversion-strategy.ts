import { HttpClient } from '../../config/http/http-client';
import { Logger } from '../../shared/logger/logger';

import { UnprocessableEntityError } from '../../shared/error/unprocessable-entity-error';
import { CurrencyConversionStrategy } from './currency-conversion-strategy';
import { CalculatePrice } from '../services/calculate-price';

import { CurrencyExchangeRateModel } from '../repository/currency-exchange-rate-model';

const BASE_URL = `${process.env.AWESOME_API}/last/USD-BRL`;

export class USDBRLCurrencyConversionStrategy
  implements CurrencyConversionStrategy
{
  constructor(
    private readonly calculatePriceService: CalculatePrice,
    private readonly httpClient: HttpClient,
    private readonly logger: Logger
  ) {}

  async convert(value: number): Promise<number> {
    try {
      this.logger.info(`[STRATEGY] calling API to currency conversion USD-BRL`);

      const { data: coin } =
        await this.httpClient.get<CurrencyExchangeRateModel>(BASE_URL);

      this.logger.info(`[STRATEGY] found coin USD-BRL ${JSON.stringify(coin)}`);

      return this.calculatePriceService.execute(value, parseFloat(coin.bid));
    } catch (error) {
      this.logger.error(
        `[STRATEGY] fail called API to currency conversion USD-BRL - ${error.message}`
      );

      throw new UnprocessableEntityError(error.message);
    }
  }
}
