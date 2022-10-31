import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const errorInterceptor = (error: AxiosError) => {
  const navigate = useNavigate();

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 400) {
    navigate('/400');
  }

  if (error.response?.status === 401) {
    navigate('/401');
  }

  if (error.response?.status === 403) {
    navigate('/403');
  }

  if (error.response?.status === 404) {
    navigate('/404');
  }

  if (error.response?.status === 500) {
    navigate('/500');
  }

  return Promise.reject(error);
};