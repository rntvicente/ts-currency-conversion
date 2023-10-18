import { CalculatePriceService } from '../../../src/application/services/calculate-price-service';

import { makeLoggerSUT } from '../../utils/logger-stub';

describe('# Test Unit Calculate Price Service Adapter', () => {
  const loggerStub = makeLoggerSUT();
  const sut = new CalculatePriceService(loggerStub);

  it('deve retornar 1.99 quando valor informado é 10 e câmbio 5.0174', () => {
    const value = 10.0;
    const exchange = 5.0174;
    const expected = 1.99;

    const result = sut.execute(value, exchange);
    expect(result).toStrictEqual(expected);
  });
});
