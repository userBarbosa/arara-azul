import {Navigate, Outlet} from 'react-router-dom';
import { useAuthContext } from '../../contexts';

const PublicRoutes=(props: any) =>{
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated() ? <Navigate to="/home"/> : <Outlet/>;
};

export default PublicRoutes;