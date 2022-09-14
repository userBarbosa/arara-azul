import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes/index';
import { DefaultTheme } from './shared/themes/default';

export const App = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
