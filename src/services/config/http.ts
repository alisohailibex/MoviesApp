import axios from 'axios';
import {AuthBASEURL} from './endpoints';

const http = axios.create({
  baseURL: AuthBASEURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  async config => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': '',
    };

    return config;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error?.response ?? error;
  },
);

export default http;
