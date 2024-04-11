import { DebugType } from '@/constants/debug.models';
import DebugGlobal, { type DebugGlobalProps } from '../debug';
import Client from './fetch';

const debug = (option: DebugGlobalProps) => new DebugGlobal(option);

const apiFetch = new Client();

apiFetch.instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    debug({
      type: DebugType.HTTP_REQUSET,
      path: error.config.url,
      alias: 'request',
      message: error.message,
      status: 'error'
    });
    return Promise.reject(error);
  }
);

apiFetch.instance.interceptors.response.use(
  (reponse) => {
    return reponse;
  },
  (error) => {
    debug({
      type: DebugType.HTTP_RESPONSE,
      path: error.config.url,
      alias: 'response',
      message: error.message,
      status: 'error'
    });
    return Promise.reject(error);
  }
);

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export default apiFetch;
