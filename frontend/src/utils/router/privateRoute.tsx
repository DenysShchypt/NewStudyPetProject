import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isToken = true;
  return isToken ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
