import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ChevronLeftOutlined, LogoutOutlined, PortraitOutlined, } from '@mui/icons-material';
import { useLocation, useNavigate, } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, } from '@mui/material';
import { navMenu } from '../../common/moks/navigate';
import { BoxStyled } from './styles';
import Logo from '../../assets/images/sideBar/Logo.svg';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';
import { useAppDispatch } from '../../utils/hook';
import { logoutUsers } from '../../store/thunks/auth';
const SideBarComponent = (props) => {
    const [active, setActive] = useState('');
    const { isNonMobile, drawerWidth, isOpen, setIsOpen } = props;
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { pathname } = location;
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(() => {
        setActive(pathname);
    }, [pathname]);
    return (_jsx(BoxStyled, { theme: theme, component: "nav", drawerWidth: drawerWidth, children: isOpen && (_jsxs(Drawer, { open: isOpen, onClose: () => setIsOpen(false), variant: "persistent", anchor: "left", className: "navMenu", children: [_jsxs(Box, { className: "navBlock", children: [_jsx(Box, { children: _jsxs(FlexBetween, { children: [_jsxs(Box, { className: "brand", children: [_jsx("img", { src: Logo, alt: "Logo app" }), _jsx(Typography, { variant: "h1", className: "brandTitle", children: "Demo" })] }), !isNonMobile && (_jsx(IconButton, { onClick: () => setIsOpen(!isOpen), children: _jsx(ChevronLeftOutlined, {}) }))] }) }), !isNonMobile && (_jsx(ListItem, { children: _jsx(Box, { children: _jsx(SearchBar, {}) }) })), _jsx(List, { className: "navList", children: navMenu.map(element => {
                                return (_jsx(ListItem, { children: _jsxs(ListItemButton, { onClick: () => navigate(`${element.path}`), className: active === element.path ? 'navItem active' : 'navItem', children: [_jsx(ListItemIcon, { children: element.icon }), _jsx(ListItemText, { children: _jsx(Typography, { children: element.name }) })] }) }, element.id));
                            }) })] }), _jsx(Box, { children: _jsxs(List, { children: [_jsx(ListItem, { children: _jsxs(ListItemButton, { onClick: () => { }, className: "navItem", children: [_jsx(ListItemIcon, { children: _jsx(PortraitOutlined, {}) }), _jsx(ListItemText, { children: _jsx(Typography, { children: "User" }) })] }) }), _jsx(ListItem, { children: _jsxs(ListItemButton, { onClick: () => {
                                        dispatch(logoutUsers());
                                        navigate('/login');
                                    }, className: "navItem", children: [_jsx(ListItemIcon, { children: _jsx(LogoutOutlined, {}) }), _jsx(ListItemText, { children: _jsx(Typography, { children: "Logout" }) })] }) }), !isNonMobile && (_jsx(ListItem, { children: _jsx(Box, { paddingLeft: "6px", children: _jsx(ThemeSwitcher, {}) }) }))] }) })] })) }));
};
export default SideBarComponent;
