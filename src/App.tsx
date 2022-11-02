import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index';
import { AppThemeProvider, AuthProvider, SideMenuProvider } from './shared/contexts';

import './shared/forms/TranslationsYup';

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
