import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { DarkMode, LightMode, NotificationsNone } from '@mui/icons-material';
import { ColorModeContext } from '../../theme';
import { ThemeStyles } from './styles';
const ThemeSwitcherComponent = () => {
    const { toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();
    return (_jsxs(ThemeStyles, { onClick: toggleColorMode, children: [_jsx(IconButton, { children: theme.palette.mode === 'dark' ? _jsx(DarkMode, {}) : _jsx(LightMode, {}) }), _jsx(IconButton, { children: _jsx(NotificationsNone, {}) })] }));
};
export default ThemeSwitcherComponent;
