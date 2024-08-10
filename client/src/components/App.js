import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import PrivateRoute from '../utils/router/privateRoute';
import { ColorModeContext, useMode } from '../theme';
import LayoutComponent from './Layout';
import HomePage from '../pages/Home';
import WatchListPage from '../pages/WatchList';
import NewsPage from '../pages/News';
import SettingsPage from '../pages/Settings';
import AuthRootComponent from '../pages/Auth';
import SingleAssetPage from '../pages/SingleAsset';
import { useAppDispatch, useAppSelector } from '../utils/hook';
import { useEffect } from 'react';
import { logoutUsers } from '../store/thunks/auth';
function App() {
    const [theme, colorMode] = useMode();
    const dispatch = useAppDispatch();
    const activeUser = useAppSelector(state => state.auth.user.verifyLink);
    const timeCheckVerify = 15 * 60 * 1000;
    useEffect(() => {
        const handleLogout = () => {
            dispatch(logoutUsers());
        };
        const timer = setTimeout(() => {
            if (activeUser !== "active") {
                handleLogout();
            }
        }, timeCheckVerify);
        return () => clearTimeout(timer);
    }, [dispatch, activeUser]);
    return (_jsx(ColorModeContext.Provider, { value: colorMode, children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx("div", { className: "app", children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(LayoutComponent, {}), children: [_jsxs(Route, { element: _jsx(PrivateRoute, {}), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/watchList", element: _jsx(WatchListPage, {}) }), _jsx(Route, { path: "/news", element: _jsx(NewsPage, {}) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "/single/:id", element: _jsx(SingleAssetPage, {}) })] }), _jsx(Route, { path: "login", element: _jsx(AuthRootComponent, {}) }), _jsx(Route, { path: "register", element: _jsx(AuthRootComponent, {}) })] }) }) })] }) }));
}
export default App;
