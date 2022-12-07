import { Api } from '../axios-config';

const LOGIN_URL = '/users/signin';
const FORGOT_PASSWORD_URL = '/users/requestnewpassword';
const RESET_PASSWORD_URL = '/users/resetpassword';

const login = async (email: string, password: string | undefined) => {
  return await Api
  .post(LOGIN_URL, JSON.stringify({email, password}))
  .then(response => {
    return response;
  })
  .catch(error => {
    if (error.message === 'Network Error') {
      return error.message;
    }
    return error.response;
  });
};

const forgotPassword = async (email: string) => {
  return await Api
  .post(FORGOT_PASSWORD_URL, JSON.stringify({email}))
  .then(response => {
    return response;
  })
  .catch(error => {
    if (error.message === 'Network Error') {
      return error.message;
    }
    return error.response;
  });
};

const resetPassword = async (password: string | undefined) => {
  return await Api
  .post(RESET_PASSWORD_URL, JSON.stringify({password}))
  .then(response => {
    return response;
  })
  .catch(error => {
    if (error.message === 'Network Error') {
      return error.message;
    }
    return error.response;
  });
};

export const AuthService = {
  login,
  forgotPassword,
  resetPassword
};