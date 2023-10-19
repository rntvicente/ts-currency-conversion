import { WinstonLogger } from '../../shared/logger/winston';
import { AxiosInstance } from '../../config/http/axios';

import { CurrencyConversionUsecase } from '../usecase/currency-conversion-usecase';
import { CurrencyConversionService } from '../services/currency-conversion-service';
import { CalculatePriceService } from '../services/calculate-price-service';
import { NormalDiscountHandler } from '../services/normal-discount-handler';
import { SaturdayDiscountHandler } from '../services/saturday-discount-handler';
import { Saturday2000DiscountHandler } from '../services/saturday-2000-discount-handler';
import { Sunday2000DiscountHandler } from '../services/sunday-2000-discount-handler';
import { WeekdayDiscountHandler } from '../services/weekday-discount-handler';

import { CurrencyConversionController } from '../controller';

export const makeCreateController = () => {
  const logger = new WinstonLogger('Currency Conversion');
  const axiosInstance = new AxiosInstance();

  const calculatePrice = new CalculatePriceService(logger);
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

  const sunday2000DiscountHandler = new Sunday2000DiscountHandler(
    saturday2000DiscountHandler
  );

  const currencyConversionService = new CurrencyConversionService(
    calculatePrice,
    axiosInstance,
    logger
  );

  const usecase = new CurrencyConversionUsecase(
    sunday2000DiscountHandler,
    currencyConversionService,
    logger
  );

  return new CurrencyConversionController(usecase, logger);
};
