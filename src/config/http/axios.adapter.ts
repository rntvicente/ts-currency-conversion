/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { UnprocessableEntityError } from '../../shared/error/unprocessable-entity-error';

import { HttpClient } from './http-client.interface';

export class AxiosAdapter implements HttpClient {
  constructor() {
    axios.defaults.validateStatus = function () {
      return true;
    };
  }

  async get(url: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
    const response = await axios.get(url, options);

    if (response.status === 422) {
      throw new UnprocessableEntityError(response.data.message);
    }

    return response.data;
  }
}
