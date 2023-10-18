import { Request } from 'express';

import { HttpResponse } from '../server/server';

export { Request, Response } from 'express';

export interface Controller {
  handle(req: Request): Promise<HttpResponse>;
}
