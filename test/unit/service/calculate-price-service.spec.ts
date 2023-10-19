import { CalculatePriceService } from '../../../src/application/services/calculate-price-service';
import { Logger } from '../../../src/shared/logger/logger';

export const makeLoggerSUT = () => {
  class LoggerStub implements Logger {
    info(message: string): void {
      console.info(message);
    }

    error(message: string): void {
      console.error(message);
    }

    warn(message: string): void {
      console.warn(message);
    }
  }

  return new LoggerStub();
};

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
