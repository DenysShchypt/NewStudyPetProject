import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';
import './style.css';
import LoginPage from './Login';
import RegisterPage from './Register';
import { instance } from '../../utils/axios';

const AuthRootComponent: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const location = useLocation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (location.pathname === '/login') {
      const userData = {
        email,
        password,
      };
      const user = await instance.post('auth/login', userData);
    } else {
      if (password === repeatPassword) {
        const userData = {
          firstName,
          lastName,
          email,
          password,
        };
        const newUser = await instance.post('auth/register', userData);
      } else {
        throw new Error('Your passwords don`t match');
      }
    }
  };

  return (
    <div className="root">
      <form className="form" onSubmit={handleSubmit}>
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
            <LoginPage setEmail={setEmail} setPassword={setPassword} />
          ) : location.pathname === '/register' ? (
            <RegisterPage
              setEmail={setEmail}
              setPassword={setPassword}
              setRepeatPassword={setRepeatPassword}
              setFirstName={setFirstName}
              setLastName={setLastName}
            />
          ) : null}
        </Box>
      </form>
    </div>
  );
};

export default AuthRootComponent;
