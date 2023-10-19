import { UnprocessableEntityError } from '../../shared/error/unprocessable-entity-error';
import { CalculateDiscountHandler } from './calculate-discount-handler';

export class Saturday2000DiscountHandler implements CalculateDiscountHandler {
  constructor(readonly next?: CalculateDiscountHandler) {}

  calculate(value: number): number {
    const currentDate = new Date();
    const hour = currentDate.getHours();

    const isSaturday = currentDate.getDay() === 6;
    const range = hour >= 22 && hour < 24;
    const discount = 0.85;

    if (value > 2000 && isSaturday && range) return value * discount;
    if (!this.next) throw new UnprocessableEntityError('');

    return this.next!.calculate(value);
  }
}
