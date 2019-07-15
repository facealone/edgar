import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../../config';
import { TokenStorage } from './tokenStorage';
import { logout } from '../modules/auth/actions/authentication';

export const client = axios.create({
  baseURL: API_URL,
});

export const axiosMiddleware = (axios: AxiosInstance) => ({ dispatch }) => {
  axios.interceptors.request.use(async config => {
    if ('login' !== config.url && 'register' !== config.url) {
      config.headers.Authorization = `Bearer ${await TokenStorage.get()}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      const reponseURL = error.request.responseURL;
      const authURL = `${API_URL}/register`;

      if (401 === error.response.status && reponseURL !== authURL) {
        return dispatch(logout());
      }

      return Promise.reject(error.response.data);
    },
  );

  return next => action => next(action);
};
