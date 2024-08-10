import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { RootStylesPersonalInfo } from './styles';
import { Alert, Box, Grid, Snackbar, TextField, useTheme, } from '@mui/material';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { updateUser } from '../../store/thunks/settings';
const SettingsPersonalInfoComponent = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const currentUser = useAppSelector(state => state.settings.user);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
    });
    useEffect(() => {
        setUserData({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
        });
    }, [currentUser]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(updateUser(userData));
            setError(false);
            setSeverity('success');
            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
        }
        catch (error) {
            setError(true);
            setSeverity('error');
            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
            return error;
        }
    };
    return (_jsxs(RootStylesPersonalInfo, { theme: theme, children: [_jsx(Grid, { component: "form", noValidate: true, autoComplete: "off", className: "root", onSubmit: handleSubmit, children: _jsxs(Box, { className: "formWrapper", children: [_jsx(TextField, { className: "inputField", value: userData.firstName, onChange: handleChange, name: "firstName", type: "text", label: "firstName", variant: "outlined" }), userData.lastName && _jsx(TextField, { className: "inputField", value: userData.lastName, onChange: handleChange, name: "lastName", type: "text", label: "lastName", variant: "outlined" }), _jsx(TextField, { className: "inputField", value: userData.email, onChange: handleChange, name: "email", type: "text", label: "email", variant: "outlined" }), _jsx(Box, { className: "buttonBlock", children: _jsx(LoadingButtonStyled, { type: "submit", children: "Save" }) })] }) }), _jsx(Snackbar, { open: open, autoHideDuration: 6, anchorOrigin: { vertical: 'top', horizontal: 'right' }, children: _jsx(Alert, { severity: severity, variant: "filled", sx: { width: '100%' }, children: !error
                        ? 'This is a success!'
                        : 'This is a fail, something is wrong!' }) })] }));
};
export default SettingsPersonalInfoComponent;
