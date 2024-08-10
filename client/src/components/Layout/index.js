import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBarComponent from '../TopBar';
import { useMediaQuery } from '@mui/material';
import SideBarComponent from '../SideBar';
import { MainSection, RootBox } from './styles';
const LayoutComponent = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isNonMobile = useMediaQuery('(min-width:760px)');
    return location.pathname === '/login' || location.pathname === '/register' ? (_jsx(_Fragment, { children: _jsx(Outlet, {}) })) : (_jsxs(RootBox, { display: isNonMobile ? 'flex' : 'block', width: "100%", height: "100%", justifyContent: "space-between", children: [_jsx(SideBarComponent, { isNonMobile: isNonMobile, drawerWidth: '250px', isOpen: isOpen, setIsOpen: setIsOpen }), _jsxs(MainSection, { children: [_jsx(TopBarComponent, { isOpen: isOpen, setIsOpen: setIsOpen, isNonMobile: isNonMobile }), _jsx(Outlet, {})] })] }));
};
export default LayoutComponent;
