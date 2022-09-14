import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes/index';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
