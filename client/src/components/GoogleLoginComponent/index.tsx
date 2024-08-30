import React from 'react';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../utils/hook';
import { registerAuthGoogleUsers } from '../../store/thunks/auth';

const GoogleLoginComponent: React.FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const handleError = (error: void) => {
    console.error('Login Error:', error);
  };

  const responseGoogle = async (response: CredentialResponse) => {
    await dispatch(
      registerAuthGoogleUsers({ token: response.credential as string }),
    );
    navigate('/');
  };
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
    >
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={(error: void) => {
          handleError(error);
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
