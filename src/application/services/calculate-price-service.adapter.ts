import { Logger } from '../../shared/logger/logger.interface';

import { CalculatePriceService } from './calculate-price.interface';

export class CalculatePriceServiceAdapter implements CalculatePriceService {
  constructor(private readonly logger: Logger) {}

  execute(value: number, exchange: number): number {
    this.logger.info(`[SERVICE] calculate price ${value} X ${exchange}`);

    const calculatedPrice = parseFloat((value / exchange).toFixed(2));
    return calculatedPrice;
  }
}
