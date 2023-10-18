import { WinstonLogger } from '../../shared/logger/winston';
import { AxiosInstance } from '../../config/http/axios';

import { CurrencyConversionUsecase } from '../usecase/currency-conversion-usecase';
import { CurrencyConversionService } from '../services/currency-conversion-service';
import { CalculatePriceService } from '../services/calculate-price-service';
import { CurrencyConversionController } from '../controller';

export const makeCreateController = () => {
  const logger = new WinstonLogger('Currency Conversion');
  const axiosInstance = new AxiosInstance();

  const calculatePrice = new CalculatePriceService(logger);
  const service = new CurrencyConversionService(
    calculatePrice,
    axiosInstance,
    logger
  );

  const usecase = new CurrencyConversionUsecase(service, logger);

  return new CurrencyConversionController(usecase, logger);
};
