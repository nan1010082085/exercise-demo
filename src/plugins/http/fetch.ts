/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-23 11:26:08
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-23 11:26:08
 * @Description reuest http
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults
} from 'axios';

const axiosDefaults = {
  baseURL: '/',
  timeout: 30000
};

class Client {
  public instance: AxiosInstance;

  constructor(public option: CreateAxiosDefaults = axiosDefaults) {
    this.instance = axios.create(option);
  }

  public requset<T = any>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request(option);
  }
}

export default Client;
