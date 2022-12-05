import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  logout: () => void;
  getCurrentUser: () => any;
  isAuthenticated: () => boolean;
  login: (email: string, password: string | undefined) => Promise<string | void>;
  forgotPassword: (email: string) => Promise<string | void>;
  resetPassword: (password: string | undefined, confirmPassword: string | undefined) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__USER = 'APP_USER';

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY__USER);

    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser({});
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string | undefined) => {
    const result = await AuthService.login(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__USER, JSON.stringify(result));
      setUser(result);
    }
  }, []);

  const handleForgotPassword = useCallback(async (email: string) => {
    // todo
  }, []);

  const handleResetPassword = useCallback(async (password: string | undefined, confirmPassword: string | undefined) => {
    // todo
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
