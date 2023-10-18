import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpClient {
  get<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
