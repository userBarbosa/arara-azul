import './shared/forms/TranslationsYup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index';
import { AppThemeProvider, AuthProvider, SideMenuProvider } from './shared/contexts';

export const App = () => {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <AppThemeProvider>
          <SideMenuProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SideMenuProvider>
        </AppThemeProvider>
      </AuthProvider>
    </>
  );
};
