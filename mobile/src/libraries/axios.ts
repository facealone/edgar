import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../../config';
import { TokenStorage } from './tokenStorage';

export const client = axios.create({
  baseURL: API_URL,
});

export const axiosMiddleware = (axios: AxiosInstance): any => {
  axios.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${await TokenStorage.get()}`;

    return config;
  });

  return next => action => next(action);
};
