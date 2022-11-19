import { Api } from '../axios-config';

interface ILogin {
  accessToken: string;
}

const login = async (email: string, password: string | undefined): Promise<ILogin | Error> => {
  try {
    const { data } = await Api.get('/login', { data: { email, password } });

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