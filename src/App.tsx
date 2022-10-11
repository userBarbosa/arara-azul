import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index';
import { MenuLateral } from './shared/components';
import { AppThemeProvider, MenuLateralProvider } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <MenuLateralProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </MenuLateralProvider>
    </AppThemeProvider>
  );
};
