export class CurrencyExchangeRateModel {
  readonly code: string;
  readonly codein: string;
  readonly name: string;
  readonly high: string;
  readonly low: string;
  readonly varBid: string;
  readonly pctChange: string;
  readonly bid: string;
  readonly ask: string;
  readonly timestamp: string;
  readonly create_date: string;

  constructor(data: Record<string, string>) {
    this.code = data.code;
    this.codein = data.codein;
    this.name = data.name;
    this.high = data.high;
    this.low = data.low;
    this.varBid = data.varBid;
    this.pctChange = data.pctChange;
    this.bid = data.bid;
    this.ask = data.ask;
    this.timestamp = data.timestamp;
    this.create_date = data.create_date;
  }
}
