import { Request, Controller } from '../../infra/controller';
import { Server } from '../../infra/server/server';

export class CurrencyConversionRoute {
  constructor(
    readonly httpServer: Pick<Server, 'on'>,
    readonly controller: Controller
  ) {
    httpServer.on('get', '/convert/:coin/:price', (req: Request) => {
      return controller.handle(req);
    });
  }
}
