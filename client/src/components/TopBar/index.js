import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { AppBarStyled } from './styles';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { refreshUsers } from '../../store/thunks/auth';
const TopBarComponent = (props) => {
    const { isOpen, setIsOpen, isNonMobile } = props;
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const firstNameUserAuth = useAppSelector(state => state.auth.user.firstName);
    const userVerify = useAppSelector(state => state.auth.user.verifyLink);
    const effectRan = useRef(false);
    useEffect(() => {
        if (!effectRan.current) {
            if (!firstNameUserAuth) {
                dispatch(refreshUsers());
            }
            effectRan.current = true;
        }
    }, [firstNameUserAuth]);
    return (_jsx(AppBarStyled, { theme: theme, children: _jsx(Toolbar, { className: "toolbar", children: _jsxs(Grid, { container: true, justifyContent: "space-between", alignItems: "center", children: [_jsx(Grid, { item: true, sm: 6, lg: 6, children: _jsxs(FlexBetween, { children: [_jsx(MenuOutlined, { className: "menuIcon", onClick: () => setIsOpen(!isOpen) }), userVerify === 'active' ? (_jsxs(Typography, { variant: "h3", children: ["Welcome ", firstNameUserAuth] })) : (_jsx(Typography, { variant: "h3", className: "menuIcon", children: "You need to verify your account via email" }))] }) }), isNonMobile && (_jsxs(Grid, { item: true, display: "flex", sm: 5, lg: 5, justifyContent: "flex-end", children: [_jsx(ThemeSwitcher, {}), _jsx(SearchBar, {})] }))] }) }) }));
};
export default TopBarComponent;
