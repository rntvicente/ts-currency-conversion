import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { CurrencyConversionService } from '../../../../src/application/services/currency-conversion-service';
import { CalculatePriceService } from '../../../../src/application/services/calculate-price-service';
import { WinstonLogger } from '../../../../src/shared/logger/winston';
import { AxiosInstance } from '../../../../src/config/http/axios';

import { CurrencyExchangeRateModel } from '../../../../src/application/repository/currency-exchange-rate-model';

const makeSUT = () => {
  const logger = new WinstonLogger('TEST');
  const service = new CalculatePriceService(logger);
  const httpClient = new AxiosInstance();

  return new CurrencyConversionService(service, httpClient, logger);
};

describe('# Test Integration Currency Convesion Service', () => {
  let mock: MockAdapter;
  const url_api = `${process.env.AWESOME_API}/last/USD-BRL`;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('deve lançar exceção quando API falhar', async () => {
    mock.onGet(url_api).networkError();

    const sut = makeSUT();

    await expect(() => sut.convert(10, 'USD', 'BRL')).rejects.toThrow(
      'Unprocessable Entity: Network Error.'
    );
  });

  it('deve converter BRL 10 para USD 1.99 corretamente quando encontrado moeda USD-BRL', async () => {
    mock.onGet(url_api).reply(200, {
      code: 'USD',
      codein: 'BRL',
      name: 'Dólar Americano/Real Brasileiro',
      high: '5.0651',
      low: '5.01',
      varBid: '-0.0188',
      pctChange: '-0.37',
      bid: '5.0174',
      ask: '5.0204',
      timestamp: '1697562039',
      create_date: '2023-10-17 14:00:39',
    });

    const sut = makeSUT();
    const coin = await sut.convert(10, 'USD', 'BRL');

    expect(coin).toStrictEqual(1.99);
  });
});
