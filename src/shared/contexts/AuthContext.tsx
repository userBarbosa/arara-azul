import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData { 
  logout: () => void;
  getCurrentUser: () => any;
  isAuthenticated: () => boolean;
  login: (email: string, password: string | undefined) => Promise<number | string | void>;
  forgotPassword: (email: string) => Promise<number | string | void>;
  resetPassword: (password: string, token: string) => Promise<number | string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__USER = 'APP_USER';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const _user = localStorage.getItem(LOCAL_STORAGE_KEY__USER);

    if (_user) {
      setUser(JSON.parse(_user));
    } else {
      setUser({});
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string | undefined) => {
    const result = await AuthService.login(email, password);

    if (result.message === 'Network Error') {
      return result.message;
    } else if (result.status !== 200) {
      return result.status;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__USER, JSON.stringify(result.data?.user));
      setUser(result.data?.user);
      return result.status;
    }
  }, []);

  const handleForgotPassword = useCallback(async (email: string) => {
    const result = await AuthService.forgotPassword(email);

    if (result.message === 'Network Error') {
      return result.message;
    } else if (result.status !== 200) {
      return result.status;
    } else {
      return result.status;
    }
  }, []);

  const handleResetPassword = useCallback(async (password: string, token: string) => {
    const result = await AuthService.resetPassword(password, token);

    if (result.message === 'Network Error') {
      return result.message;
    } else if (result.status !== 200) {
      return result.status;
    } else {
      return result.status;
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__USER);
    setUser({});
  }, []);

  const isAuthenticated = () => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY__USER);
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const getCurrentUser = () => {
    const _user = localStorage.getItem(LOCAL_STORAGE_KEY__USER);
  
    if (_user) return JSON.parse(_user);
  };

  return (
    <AuthContext.Provider value={{ getCurrentUser, isAuthenticated, login: handleLogin, logout: handleLogout, forgotPassword: handleForgotPassword, resetPassword: handleResetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
