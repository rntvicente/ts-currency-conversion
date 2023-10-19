import Chance from 'chance';

import { CoinEntity } from '../../../src/domain/coin-entity';

describe('# Test Unit Value Object Coin', () => {
  const chance = Chance();

  const { code } = chance.currency();
  const value = 199.99;

  it('deve lançar exceção quando informado identificador de moeda diferente de 3 caracteres', async () => {
    expect(() => CoinEntity.create('AB', value)).rejects.toThrow(
      'Invalid Field: id.'
    );
    expect(() => CoinEntity.create('ABCD', value)).rejects.toThrow(
      'Invalid Field: id.'
    );
  });

  it('deve criar moeda corretamente', async () => {
    const coin = await CoinEntity.create(code, value);

    expect(coin).toBeInstanceOf(CoinEntity);
    expect(coin).toEqual({ id: code, value });
  });
});
