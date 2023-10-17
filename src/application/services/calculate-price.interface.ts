export interface CalculatePriceService {
  execute(value: number, exchange: number): number;
}
