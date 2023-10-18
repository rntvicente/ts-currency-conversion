import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import { ExpressAdapter } from '../../../src/infra/server/express';
import { WinstonLogger } from '../../../src/shared/logger/winston';

import { makeCreateController } from '../../../src/application/factory';
import { CurrencyConversionRoute } from '../../../src/application/route';

describe('# Test Integration Route GET:/convert/:coin/:price', () => {
  let mock: MockAdapter;
  const url_api = process.env.AWESOME_API;

  const logger = new WinstonLogger('TEST');
  const server = new ExpressAdapter(logger);

  const controller = makeCreateController();

  new CurrencyConversionRoute(server, controller);

  beforeAll(() => {
    server.start(process.env.PORT);
  });

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    server.close();
  });

  it('deve receber statusCode 422 when API falhar', async () => {
    mock.onGet(`${url_api}/last/USD-BRL`).networkError();

    mock
      .onGet(`${url_api}/last/EUR-BRL`)
      .reply(200, { EURBRL: { bid: '5.0174' } });

    mock
      .onGet(`${url_api}/last/INR-BRL`)
      .reply(200, { INRBRL: { bid: '5.0175' } });

    await request(server.getApp()).get('/convert/BRL/10').expect(422);
  });

  it('deve retornar statusCode 200 e conversão para moedas corretamente', async () => {
    mock
      .onGet(`${url_api}/last/USD-BRL`)
      .reply(200, { USDBRL: { bid: '5.0397' } });
    mock
      .onGet(`${url_api}/last/EUR-BRL`)
      .reply(200, { EURBRL: { bid: '5.3188' } });
    mock
      .onGet(`${url_api}/last/INR-BRL`)
      .reply(200, { INRBRL: { bid: '0.06053' } });

    const { body } = await request(server.getApp())
      .get('/convert/BRL/10')
      .expect(200);

    expect(body).toEqual({ USD: 1.98, EUR: 1.88, INR: 165.21 });
  });
});
