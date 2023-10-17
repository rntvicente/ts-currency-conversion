import { Logger } from '../../src/shared/logger/logger.interface';

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
