import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Grid, Snackbar, TextField, useTheme, } from '@mui/material';
import { useState } from 'react';
import { RootStylesChangePassword } from './styles';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { updateUserPassword } from '../../store/thunks/settings';
import { useAppDispatch } from '../../utils/hook';
const ChangePasswordUser = () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [error, setError] = useState(false);
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [passwords, setPasswords] = useState({
        password: '',
        newPassword: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(updateUserPassword(passwords));
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
    return (_jsxs(RootStylesChangePassword, { theme: theme, children: [_jsx(Grid, { component: "form", noValidate: true, autoComplete: "off", className: "root", onSubmit: handleSubmit, children: _jsxs(Box, { className: "formWrapper", children: [_jsx(TextField, { className: "inputField", value: passwords.password, onChange: handleChange, name: "password", type: "text", label: "password", variant: "outlined" }), _jsx(TextField, { className: "inputField", value: passwords.newPassword, onChange: handleChange, name: "newPassword", type: "text", label: "newPassword", variant: "outlined" }), _jsx(Box, { className: "buttonBlock", children: _jsx(LoadingButtonStyled, { type: "submit", children: "Save" }) })] }) }), _jsx(Snackbar, { open: open, autoHideDuration: 6, anchorOrigin: { vertical: 'top', horizontal: 'right' }, children: _jsx(Alert, { severity: severity, variant: "filled", sx: { width: '100%' }, children: !error
                        ? 'This is a success!'
                        : 'This is a fail, something is wrong!' }) })] }));
};
export default ChangePasswordUser;
