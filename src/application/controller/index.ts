import { Controller, Request } from '../../infra/controller';
import { HttpResponse } from '../../infra/server/server';

import { Logger } from '../../shared/logger/logger';
import { Usecase } from '../usecase/usecase';

export class CurrencyConversionController implements Controller {
  constructor(
    private readonly usecase: Usecase,
    private readonly logger: Logger
  ) {}

  async handle({ params: { coin, price } }: Request): Promise<HttpResponse> {
    this.logger.info(
      `[CONTROLLER] starting currency conversion ${coin} price ${price}`
    );

    const data = await this.usecase.execute({ coin, price });

    return {
      statusCode: 200,
      body: data,
    };
  }
}
