import './shared/forms/TranslationsYup';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index';
import { AppThemeProvider, AuthProvider, SideMenuProvider } from './shared/contexts';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <SideMenuProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SideMenuProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};
