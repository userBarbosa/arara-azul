import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index';
import { SideMenu } from './shared/components';
import { AppThemeProvider, SideMenuProvider } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <SideMenuProvider>
        <BrowserRouter>
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </BrowserRouter>
      </SideMenuProvider>
    </AppThemeProvider>
  );
};
