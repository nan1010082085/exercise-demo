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

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

const axiosDefaults = {
  baseURL: '/',
  timeout: 30000
};

class ApiHttp {
  instance: AxiosInstance;
  constructor(public option: CreateAxiosDefaults) {
    this.instance = axios.create(option);
    this.init();
  }

  init() {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (reponse) => {
        return reponse;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  requset<T = any>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request(option);
  }
}

export default new ApiHttp(axiosDefaults);
