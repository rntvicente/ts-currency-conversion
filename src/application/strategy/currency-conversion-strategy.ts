export interface CurrencyConversionStrategy {
  convert(value: number): Promise<number>;
}
