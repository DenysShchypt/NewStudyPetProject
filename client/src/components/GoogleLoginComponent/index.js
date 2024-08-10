import { jsx as _jsx } from "react/jsx-runtime";
import { GoogleOAuthProvider, GoogleLogin, } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../utils/hook';
import { registerAuthGoogleUsers } from '../../store/thunks/auth';
const GoogleLoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleError = (error) => {
        console.error('Login Error:', error);
    };
    const responseGoogle = async (response) => {
        await dispatch(registerAuthGoogleUsers({ token: response.credential }));
        navigate('/');
    };
    return (_jsx(GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, children: _jsx(GoogleLogin, { onSuccess: responseGoogle, onError: (error) => {
                handleError(error);
            } }) }));
};
export default GoogleLoginComponent;
