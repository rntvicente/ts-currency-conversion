import { CurrencyExchangeRateModel } from 'application/repository/currency-exchange-rate.model';
import { HttpClient } from '../../config/http/http-client';
import { Logger } from '../../shared/logger/logger';

import { Usecase } from './use-case.interface';

const BASE_URL = process.env.AWESOME_API;

export class CurrencyConversionUseCase implements Usecase {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: Logger
  ) {}

  async execute({ coinId, value }: Input): Promise<void> {
    this.logger.info(
      `[USE CASE] starting currency conversion ${coinId} value ${value}.`
    );

    await this.httpClient.get<CurrencyExchangeRateModel>(
      `${BASE_URL}/last/USD-BRL,EUR-BRL,INR-BRL`
    );
  }
}

export type Input = {
  coinId: string;
  value: number;
};
