import { UnprocessableEntityError } from '../../shared/error/unprocessable-entity-error';

import { CalculateDiscountHandler } from './calculate-discount-handler';

export class WeekdayDiscountHandler implements CalculateDiscountHandler {
  constructor(readonly next?: CalculateDiscountHandler) {}

  calculate(value: number): number {
    const currentDate = new Date();
    const hour = currentDate.getHours();

    const isWeekend = [0, 6].includes(currentDate.getDay());
    const range = hour >= 19 && hour < 24;
    const discount = 0.95;

    if (!isWeekend && value > 3000 && range) return value * discount;
    if (!this.next) throw new UnprocessableEntityError('');

    return this.next.calculate(value);
  }
}
