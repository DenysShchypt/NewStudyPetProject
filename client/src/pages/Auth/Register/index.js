import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, TextField, Typography, useTheme } from '@mui/material';
import { ButtonAuthNavStyled, LoadingButtonStyled, } from '../../../components/GeneralComponentsStyles';
import { RootStylesRegister } from './styles';
import GoogleLoginComponent from '../../../components/GoogleLoginComponent';
const RegisterPage = (props) => {
    const { navigate, register, errors, loading } = props;
    const theme = useTheme();
    return (_jsx(RootStylesRegister, { theme: theme, children: _jsxs(Grid, { className: "root", children: [_jsx(Typography, { variant: "h2", padding: 2, textAlign: "center", children: "Registration" }), _jsx(Typography, { variant: "body1", textAlign: "center", marginBottom: 3, children: "Write down your details" }), _jsx(TextField, { error: !!errors.firstName, fullWidth: true, margin: "normal", label: "Your first name", variant: "outlined", placeholder: "Input your first name", helperText: errors.firstName ? `${errors.firstName.message}` : '', ...register('firstName', {
                        required: 'Enter your firstName',
                    }) }), _jsx(TextField, { error: !!errors.lastName, fullWidth: true, margin: "normal", label: "Last name", variant: "outlined", placeholder: "Input your last name", helperText: errors.lastName ? `${errors.lastName.message}` : '', ...register('lastName', {
                        required: 'Enter your lastName',
                    }) }), _jsx(TextField, { error: !!errors.email, fullWidth: true, margin: "normal", label: "Email Address", variant: "outlined", placeholder: "Input your email", helperText: errors.email ? `${errors.email.message}` : '', ...register('email', {
                        required: 'Enter your email',
                    }) }), _jsx(TextField, { error: !!errors.password, type: "password", fullWidth: true, margin: "normal", label: "Password", variant: "outlined", placeholder: "Input your password", helperText: errors.password ? `${errors.password.message}` : '', ...register('password', {
                        required: 'Enter your password',
                    }) }), _jsx(TextField, { error: !!errors.passwordRepeat, type: "password", fullWidth: true, margin: "normal", label: "Password", variant: "outlined", placeholder: "Input your password", helperText: errors.passwordRepeat ? `${errors.passwordRepeat.message}` : '', ...register('passwordRepeat', {
                        required: 'Enter your repeat password',
                    }) }), _jsx(Box, { className: "buttonBlock", children: _jsx(LoadingButtonStyled, { loading: loading, type: "submit", variant: "contained", children: "Registration" }) }), _jsx(Box, { className: "google", children: _jsx(GoogleLoginComponent, {}) }), _jsx(Box, { className: "redirection", children: _jsxs(Typography, { variant: "body1", sx: { fontFamily: 'Poppins' }, children: ["If you have an account?", ' ', _jsx(ButtonAuthNavStyled, { onClick: () => navigate('/login'), children: "Enter" })] }) })] }) }));
};
export default RegisterPage;
