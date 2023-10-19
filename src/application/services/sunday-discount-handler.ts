import { UnprocessableEntityError } from '../../shared/error/unprocessable-entity-error';
import { CalculateDiscountHandler } from './calculate-discount-handler';

export class SundayDiscountHandler implements CalculateDiscountHandler {
  constructor(readonly next?: CalculateDiscountHandler) {}

  calculate(value: number): number {
    const currentDate = new Date();
    const hour = currentDate.getHours();

    const isSunday = currentDate.getDay() === 0;
    const range = hour <= 5;
    const discount = 0.9;

    if (value <= 2000 && isSunday && range) return value * discount;
    if (!this.next) throw new UnprocessableEntityError('');

    return this.next.calculate(value);
  }
}
