import { useLocation } from 'react-router-dom';
import './style.css';
import LoginPage from './Login';
import RegisterPage from './Register';
import { Box } from '@mui/material';

const AuthRootComponent = () => {
  const location = useLocation();

  return (
    <div className="root">
      <div className="form">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow="5px 5px 10px rgb(109, 108, 108)"
        >
          {location.pathname === '/login' ? (
            <LoginPage />
          ) : location.pathname === '/register' ? (
            <RegisterPage />
          ) : null}
        </Box>
      </div>
    </div>
  );
};

export default AuthRootComponent;
