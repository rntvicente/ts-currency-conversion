export interface CalculateDiscountHandler {
  next?: CalculateDiscountHandler;
  calculate(value: number): number;
}
