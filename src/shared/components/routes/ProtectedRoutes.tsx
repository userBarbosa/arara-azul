import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts';

//protected Route state
type ProtectedRouteType = {
	roleRequired?: ['admin', 'doctor', 'assistant'] | ['admin', 'assistant']  | ['admin', 'doctor']  | ['admin']  
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
  const { getCurrentUser, isAuthenticated } = useAuthContext();

  //if the role required is there or not
  if (props.roleRequired) {
    return isAuthenticated() ? (
      props.roleRequired?.find(type => getCurrentUser().type?.includes(type)) ? (
        <Outlet />
      ) : (
        <Navigate to="/403" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;