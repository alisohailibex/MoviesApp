import axios from 'axios';
import {AuthBASEURL, MoviesBASEURL} from './endpoints';

const moviesHttp = axios.create({
  baseURL: MoviesBASEURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

moviesHttp.interceptors.request.use(
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

moviesHttp.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error?.response ?? error;
  },
);

export default moviesHttp;
