import { Api } from '../axios-config';

const LOGIN_URL = '/users/signin';
const FORGOT_PASSWORD_URL = '/users/requestnewpassword';
const RESET_PASSWORD_URL = '/users/resetpassword';

const login = async (email: string, password: string | undefined) => {
  try {
    const response = await Api.post(LOGIN_URL, 
      JSON.stringify({email, password}),
      {
        headers: { 'Content-Type': 'application/json'}
      }
    );

    return response;
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

const forgotPassword = async (email: string) => {
  // todo
};

const resetPassword = async (password: string | undefined, confirmPassword: string | undefined) => {
  // todo
};

export const AuthService = {
  login,
  forgotPassword,
  resetPassword
};