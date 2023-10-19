import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { CurrencyConversionUsecase } from '../../src/application/usecase/currency-conversion-usecase';
import { CurrencyConversionService } from '../../src/application/services/currency-conversion-service';
import { CalculatePriceService } from '../../src/application/services/calculate-price-service';
import { NormalDiscountHandler } from '../../src/application/services/normal-discount-handler';
import { SaturdayDiscountHandler } from '../../src/application/services/saturday-discount-handler';
import { Saturday2000DiscountHandler } from '../../src/application/services/saturday-2000-discount-handler';
import { SundayDiscountHandler } from '../../src/application/services/sunday-discount-handler';
import { Sunday2000DiscountHandler } from '../../src/application/services/sunday-2000-discount-handler';
import { WeekdayDiscountHandler } from '../../src/application/services/weekday-discount-handler';

import { WinstonLogger } from '../../src/shared/logger/winston';
import { AxiosInstance } from '../../src/config/http/axios';

const makeSUT = () => {
  const logger = new WinstonLogger('TEST');
  const axiosinstance = new AxiosInstance();
  const calculatePrice = new CalculatePriceService(logger);
  const currencyConversionService = new CurrencyConversionService(
    calculatePrice,
    axiosinstance,
    logger
  );

  const normalDiscountHandler = new NormalDiscountHandler();
  const weekdayDiscountHandler = new WeekdayDiscountHandler(
    normalDiscountHandler
  );

  const saturdayDiscountHandler = new SaturdayDiscountHandler(
    weekdayDiscountHandler
  );

  const saturday2000DiscountHandler = new Saturday2000DiscountHandler(
    saturdayDiscountHandler
  );

  const sundayDiscountHandler = new SundayDiscountHandler(
    saturday2000DiscountHandler
  );

  const sunday2000DiscountHandler = new Sunday2000DiscountHandler(
    sundayDiscountHandler
  );

  return new CurrencyConversionUsecase(
    sunday2000DiscountHandler,
    currencyConversionService,
    logger
  );
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

  it('deve lançar exceção quando API falhar', async () => {
    mock.onGet(`${url_api}/last/USD-BRL`).networkError();

    mock
      .onGet(`${url_api}/last/EUR-BRL`)
      .reply(200, { EURBRL: { bid: '5.0174' } });

    mock
      .onGet(`${url_api}/last/INR-BRL`)
      .reply(200, { INRBRL: { bid: '5.0175' } });

    const sut = makeSUT();

    await expect(() => sut.execute({ price: 10, coin: 'BRL' })).rejects.toThrow(
      'Network Error'
    );
  });

  it('deve retornar conversão de BRL 10.00 para USD, EUR e INR quando executado corretamente', async () => {
    jest.useFakeTimers().setSystemTime(new Date(2023, 9, 2, 15));

    mock
      .onGet(`${url_api}/last/USD-BRL`)
      .reply(200, { USDBRL: { bid: '5.0397' } });
    mock
      .onGet(`${url_api}/last/EUR-BRL`)
      .reply(200, { EURBRL: { bid: '5.3188' } });
    mock
      .onGet(`${url_api}/last/INR-BRL`)
      .reply(200, { INRBRL: { bid: '0.06053' } });

    const sut = makeSUT();
    const coins = await sut.execute({ price: 10, coin: 'BRL' });

    expect(coins).toEqual({ USD: 1.98, EUR: 1.88, INR: 165.21 });
  });

  it.each([new Date(2023, 9, 2, 19), new Date(2023, 9, 2, 23, 59, 59)])(
    'deve aplicar 5% de desconto quando valor > 3000 e range de horário entre às 19h e 24h e dia de semana',
    async (day) => {
      jest.useFakeTimers().setSystemTime(day);

      mock
        .onGet(`${url_api}/last/USD-BRL`)
        .reply(200, { USDBRL: { bid: '5.0397' } });
      mock
        .onGet(`${url_api}/last/EUR-BRL`)
        .reply(200, { EURBRL: { bid: '5.3188' } });
      mock
        .onGet(`${url_api}/last/INR-BRL`)
        .reply(200, { INRBRL: { bid: '0.06053' } });

      const sut = makeSUT();
      const coins = await sut.execute({ price: 3001, coin: 'BRL' });

      expect(coins).toEqual({ USD: 565.7, EUR: 536.01, INR: 47099.79 });
    }
  );

  it.each([
    new Date(2023, 9, 14, 22),
    new Date(2023, 9, 14, 23, 59, 59),
    new Date(2023, 9, 15),
    new Date(2023, 9, 15, 5),
  ])(
    'deve aplicar 15% de desconto quando valor > 2000 e range de horário entre às 22h e 5h e fim de semana %s',
    async (day) => {
      jest.useFakeTimers().setSystemTime(day);

      mock
        .onGet(`${url_api}/last/USD-BRL`)
        .reply(200, { USDBRL: { bid: '5.0397' } });
      mock
        .onGet(`${url_api}/last/EUR-BRL`)
        .reply(200, { EURBRL: { bid: '5.3188' } });
      mock
        .onGet(`${url_api}/last/INR-BRL`)
        .reply(200, { INRBRL: { bid: '0.06053' } });

      const sut = makeSUT();
      const coins = await sut.execute({ price: 2001, coin: 'BRL' });

      expect(coins).toEqual({ USD: 337.49, EUR: 319.78, INR: 28099.29 });
    }
  );

  it.each([
    new Date(2023, 9, 14, 22),
    new Date(2023, 9, 14, 23, 59, 59),
    new Date(2023, 9, 15),
    new Date(2023, 9, 15, 5),
  ])(
    'deve aplicar 10% de desconto quando valor <= 2000 e range de horário entre às 22h e 5h e fim de semana %s',
    async (day) => {
      jest.useFakeTimers().setSystemTime(day);

      mock
        .onGet(`${url_api}/last/USD-BRL`)
        .reply(200, { USDBRL: { bid: '5.0397' } });
      mock
        .onGet(`${url_api}/last/EUR-BRL`)
        .reply(200, { EURBRL: { bid: '5.3188' } });
      mock
        .onGet(`${url_api}/last/INR-BRL`)
        .reply(200, { INRBRL: { bid: '0.06053' } });

      const sut = makeSUT();
      const coins = await sut.execute({ price: 2000, coin: 'BRL' });

      expect(coins).toEqual({ USD: 357.16, EUR: 338.42, INR: 29737.32 });
    }
  );
});
