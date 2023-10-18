import * as dotenv from 'dotenv';

import { Server } from './infra/server/server';
import { ExpressAdapter } from './infra/server/express';

import { Logger } from './shared/logger/logger';
import { WinstonLogger } from './shared/logger/winston';

import { CurrencyConversionRoute } from './application/route';
import { makeCreateController } from './application/factory';

dotenv.config();

const PORT = process.env.PORT || 3000;

export class Main {
  private readonly _logger: Logger;
  private readonly _server: Server;

  constructor() {
    this._logger = new WinstonLogger('[API]');
    this._server = new ExpressAdapter(this._logger);
  }

  start() {
    this._server.start(+PORT);
    this.inicializedRoutes();
  }

  private inicializedRoutes() {
    this._logger.info('Initialized routes');
    new CurrencyConversionRoute(this._server, makeCreateController());
  }

  stop() {
    this._server.close();
  }
}

const server = new Main();

server.start();

process.on('uncaughtException', (error) => {
  console.error(`Exceção não tratada: ${error.message}`);
});

process.on('SIGINT', async () => server.stop());
