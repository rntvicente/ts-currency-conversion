import { AxiosRequestConfig } from 'axios';

export interface HttpClient {
  get(url: string, options?: AxiosRequestConfig): Promise<any>;
}
