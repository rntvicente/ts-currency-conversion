import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { CurrencyConversionUsecase } from '../../../src/application/usecase/currency-conversion-usecase';
import { CurrencyConversionService } from '../../../src/application/services/currency-conversion-service';
import { CalculatePriceService } from '../../../src/application/services/calculate-price-service';

import { WinstonLogger } from '../../../src/shared/logger/winston';
import { AxiosInstance } from '../../../src/config/http/axios';

const makeSUT = () => {
  const logger = new WinstonLogger('TEST');
  const axiosinstance = new AxiosInstance();
  const calculatePrice = new CalculatePriceService(logger);
  const service = new CurrencyConversionService(
    calculatePrice,
    axiosinstance,
    logger
  );

  return new CurrencyConversionUsecase(service, logger);
};

describe('# Test Integration Currency Conversion Usecase', () => {
  let mock: MockAdapter;
  const url_api = process.env.AWESOME_API;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('deve lançar exceção quando chamada a API USD-BRL e falhar', async () => {
    mock.onGet(`${url_api}/last/USD-BRL`).networkError();
    mock.onGet(`${url_api}/last/EUR-BRL`).reply(200, { bid: '5.0174' });
    mock.onGet(`${url_api}/last/INR-BRL`).reply(200, { bid: '5.0175' });

    const sut = makeSUT();

    await expect(() => sut.execute(10)).rejects.toThrow(
      'Unprocessable Entity: Network Error.'
    );
  });

  it('deve retornar conversão de BRL 10.00 para USD, EUR e INR quando executado corretamente', async () => {
    mock.onGet(`${url_api}/last/USD-BRL`).reply(200, { bid: '5.0397' });
    mock.onGet(`${url_api}/last/EUR-BRL`).reply(200, { bid: '5.3188' });
    mock.onGet(`${url_api}/last/INR-BRL`).reply(200, { bid: '0.06053' });

    const sut = makeSUT();
    const coins = await sut.execute(10);

    expect(coins).toEqual({ USD: 1.98, EUR: 1.88, INR: 165.21 });
  });
});
