import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, TextField, Typography, useTheme } from '@mui/material';
import { ButtonAuthNavStyled, LoadingButtonStyled, } from '../../../components/GeneralComponentsStyles';
import { RootStylesLogin } from './styles';
import GoogleLoginComponent from '../../../components/GoogleLoginComponent';
const LoginPage = (props) => {
    const { navigate, register, errors, loading } = props;
    const theme = useTheme();
    return (_jsx(RootStylesLogin, { theme: theme, children: _jsxs(Grid, { className: "root", children: [_jsx(Typography, { variant: "h2", padding: 2, textAlign: "center", children: "Authorization" }), _jsx(Typography, { variant: "body1", textAlign: "center", marginBottom: 3, children: "Write down your login and password" }), _jsx(TextField, { error: !!errors.email, fullWidth: true, margin: "normal", label: "Email Address", variant: "outlined", placeholder: "Input your email", helperText: errors.email ? `${errors.email.message}` : '', ...register('email', {
                        required: 'Enter your email',
                    }) }), _jsx(TextField, { error: !!errors.password, type: "password", fullWidth: true, margin: "normal", label: "Password", variant: "outlined", placeholder: "Input your password", helperText: errors.password ? `${errors.password.message}` : '', ...register('password', {
                        required: 'Enter your password',
                    }) }), _jsx(Box, { className: "buttonBlock", children: _jsx(LoadingButtonStyled, { loading: loading, type: "submit", variant: "contained", children: "Enter" }) }), _jsx(Box, { className: "google", children: _jsx(GoogleLoginComponent, {}) }), _jsx(Box, { className: "redirection", children: _jsxs(Typography, { variant: "body1", children: ["Do you have an account?", _jsx(ButtonAuthNavStyled, { onClick: () => navigate('/register'), children: "Registration" })] }) })] }) }));
};
export default LoginPage;
