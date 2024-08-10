import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hook';
const PrivateRoute = () => {
    const isToken = useAuth();
    return isToken ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "login" });
};
export default PrivateRoute;
