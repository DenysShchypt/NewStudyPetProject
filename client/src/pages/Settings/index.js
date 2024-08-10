import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { CustomTabPanel } from '../../components/TabPanel';
import a11yProps from '../../utils/helpers';
import { RootStylesSettings } from './styles';
import { tokens } from '../../theme';
import { infoUser } from '../../store/thunks/settings';
import { useAppDispatch } from '../../utils/hook';
import SettingsPersonalInfoComponent from '../../components/SettingsPersonalInfo';
import ChangePasswordUser from '../../components/changePassword';
import RemoveUser from '../../components/deleteUser';
const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(infoUser());
    }, []);
    return (_jsxs(RootStylesSettings, { theme: theme, children: [_jsx(Box, { className: "tabsWrapper", children: _jsxs(Tabs, { value: value, onChange: handleChange, "aria-label": "Settings tabs", centered: true, textColor: "secondary", TabIndicatorProps: {
                        style: {
                            backgroundColor: colors.blue,
                        },
                    }, children: [_jsx(Tab, { label: "Personal data", ...a11yProps(0) }), _jsx(Tab, { label: "Change password", ...a11yProps(1) }), _jsx(Tab, { label: "Remove account", ...a11yProps(2) })] }) }), _jsx(CustomTabPanel, { value: value, index: 0, children: _jsx(SettingsPersonalInfoComponent, {}) }), _jsx(CustomTabPanel, { value: value, index: 1, children: _jsx(ChangePasswordUser, {}) }), _jsx(CustomTabPanel, { value: value, index: 2, children: _jsx(RemoveUser, {}) })] }));
};
export default SettingsPage;
