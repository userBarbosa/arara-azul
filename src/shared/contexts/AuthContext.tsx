import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AuthService } from '../services/api/auth/AuthService';


interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string | undefined) => Promise<string | void>;
  forgotPassword: (email: string) => Promise<string | void>;
  resetPassword: (password: string | undefined, confirmPassword: string | undefined) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, []);


  const handleLogin = useCallback(async (email: string, password: string | undefined) => {
    const result = await AuthService.login(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
      setAccessToken(result.accessToken);
    }
  }, []);

  const handleForgotPassword = useCallback(async (email: string) => {
    // todo
  }, []);

  const handleResetPassword = useCallback(async (password: string | undefined, confirmPassword: string | undefined) => {
    // todo
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, forgotPassword: handleForgotPassword, resetPassword: handleResetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);