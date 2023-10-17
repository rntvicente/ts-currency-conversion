import Chance from 'chance';

import { CoinVO } from '../../../src/shared/value-object/coin.vo';

describe('# Test Unit Value Object Coin', () => {
  const chance = Chance();

  it('deve lançar exceção quando informado identificador de moeda diferente de 3 caracteres', () => {
    expect(() => new CoinVO('AB', 1)).toThrow('Invalid Field: identity.');
    expect(() => new CoinVO('ABCD', 1)).toThrow('Invalid Field: identity.');
  });

  it('deve lançar exceção quando câmbio menor que zero', () => {
    const { code: identity } = chance.currency();
    expect(() => new CoinVO(identity, -1)).toThrow('Invalid Field: exchange.');
  });

  it('deve criar moeda corretamente com identificador e câmbio', () => {
    const coin = new CoinVO('BRL', 5.345);

    expect(coin).toBeInstanceOf(CoinVO);
    expect(coin.identity).toStrictEqual('BRL');
    expect(coin.exchange).toStrictEqual(5.345);
    expect(coin.toString).toStrictEqual('BRL - 5.345');
  });
});
