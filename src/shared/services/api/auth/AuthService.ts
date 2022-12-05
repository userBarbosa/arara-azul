import { Api } from '../axios-config';

const LOGIN_URL = '/signin';
const FORGOT_PASSWORD_URL = '/requestnewpassword';
const RESET_PASSWORD_URL = '/resetpassword';

interface ILogin {
  token: string;
  type: string;
}

const login = async (email: string, password: string | undefined): Promise<ILogin | Error> => {
  try {
    const { data } = await Api.get(LOGIN_URL, { data: { email, password } });

    if (data) {
      return data;
    }

    return new Error('Erro no login.');
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