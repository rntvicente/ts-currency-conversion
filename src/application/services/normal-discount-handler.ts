import { CalculateDiscountHandler } from './calculate-discount-handler';

export class NormalDiscountHandler implements CalculateDiscountHandler {
  constructor(readonly next?: CalculateDiscountHandler) {}

  calculate(value: number): number {
    return value;
  }
}
