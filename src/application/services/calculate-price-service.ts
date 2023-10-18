import { Logger } from '../../shared/logger/logger';

import { CalculatePrice } from './calculate-price';

export class CalculatePriceService implements CalculatePrice {
  constructor(private readonly logger: Logger) {}

  execute(value: number, exchange: number): number {
    this.logger.info(`[SERVICE] calculate price ${value} / ${exchange}`);

    const calculatedPrice = parseFloat((value / exchange).toFixed(2));
    return calculatedPrice;
  }
}
