import Chance from 'chance';

import { CoinEntity } from '../../../src/domain/coin-entity';

describe('# Test Unit Value Object Coin', () => {
  const chance = Chance();

  const { code } = chance.currency();
  const value = 199.99;
  const discount = 15;
  const createAt = new Date(2023, 9, 1, 10);

  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(createAt);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve lançar exceção quando informado identificador de moeda diferente de 3 caracteres', async () => {
    expect(() => CoinEntity.create('AB', value, discount)).rejects.toThrow(
      'Invalid Field: id.'
    );
    expect(() => CoinEntity.create('ABCD', value, discount)).rejects.toThrow(
      'Invalid Field: id.'
    );
  });

  it('deve criar moeda corretamente', async () => {
    const coin = await CoinEntity.create(code, value, discount);

    expect(coin).toBeInstanceOf(CoinEntity);
    expect(coin).toEqual({
      id: code,
      value,
      discount,
      createAt,
    });
  });
});
