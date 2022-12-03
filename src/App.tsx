import './shared/forms/TranslationsYup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppThemeProvider, AuthProvider, SideMenuProvider } from './shared/contexts';
import { MainRoutes } from './Routes';

export const App = () => {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <AppThemeProvider>
          <SideMenuProvider>
            <MainRoutes />
          </SideMenuProvider>
        </AppThemeProvider>
      </AuthProvider>
    </>
  );
};
