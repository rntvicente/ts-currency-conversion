export interface CurrencyConversion {
  convert(
    value: number,
    sourceCurrency: string,
    targetCurrency: string
  ): Promise<number>;
}
