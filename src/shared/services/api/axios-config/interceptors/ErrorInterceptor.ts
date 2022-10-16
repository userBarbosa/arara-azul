import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 400) {
    //
  }

  if (error.response?.status === 401) {
    //
  }

  if (error.response?.status === 403) {
    //
  }

  if (error.response?.status === 400) {
    //
  }

  if (error.response?.status === 500) {
    //
  }

  return Promise.reject(error);
};