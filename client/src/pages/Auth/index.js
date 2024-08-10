import { jsx as _jsx } from "react/jsx-runtime";
import { useLocation, useNavigate, } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginPage from './Login';
import RegisterPage from './Register';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { AppError } from '../../common/errors';
import { LoginSchema, RegisterSchema } from '../../utils/yup';
import { BoxFormStyled, RootStyled } from './styles';
import { loginUsers, registerUsers } from '../../store/thunks/auth';
const AuthRootComponent = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(state => state.auth.isLoading);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(location.pathname === '/login' ? LoginSchema : RegisterSchema),
    });
    const handleSubmitForm = async (data) => {
        if (location.pathname === '/login') {
            try {
                await dispatch(loginUsers(data));
                navigate('/');
            }
            catch (error) {
                return error;
            }
        }
        else {
            if (data.password === data.passwordRepeat) {
                try {
                    const userData = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        passwordRepeat: data.passwordRepeat,
                    };
                    await dispatch(registerUsers(userData));
                    navigate('/');
                }
                catch (error) {
                    return error;
                }
            }
            else {
                throw new Error(AppError.WRONG_PASSWORD_DO_NOT_MATCH);
            }
        }
    };
    return (_jsx(RootStyled, { children: _jsx("form", { className: "form", onSubmit: handleSubmit(handleSubmitForm), children: _jsx(BoxFormStyled, { children: location.pathname === '/login' ? (_jsx(LoginPage, { navigate: navigate, register: register, errors: errors, loading: loading })) : location.pathname === '/register' ? (_jsx(RegisterPage, { navigate: navigate, register: register, errors: errors, loading: loading })) : null }) }) }));
};
export default AuthRootComponent;
