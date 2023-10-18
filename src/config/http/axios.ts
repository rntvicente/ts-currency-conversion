/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpClient } from './http-client';

export class AxiosInstance implements HttpClient {
  constructor() {
    axios.defaults.validateStatus = function () {
      return true;
    };
  }

  async get<T>(
    url: string,
    options: AxiosRequestConfig
  ): Promise<AxiosResponse<T, any>> {
    return axios.get<T, any>(url, options);
  }
}
