import { TextField, Typography } from '@mui/material';
import { IPropsLogin } from '../../../common/types/auth';
import {
  ButtonAuthNavStyled,
  ButtonStyled,
} from '../../GeneralComponentsStyles';

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props;
  return (
    <>
      <Typography variant="h2" padding={2} textAlign="center">
        Authorization
      </Typography>
      <Typography variant="body1" textAlign="center" marginBottom={3}>
        Write down your login and password
      </Typography>
      <TextField
        error={!!errors.email}
        fullWidth={true}
        margin="normal"
        label="Email Address"
        variant="outlined"
        placeholder="Input your email"
        helperText={errors.email ? `${errors.email.message}` : ''}
        {...register('email', {
          required: 'Enter your email',
        })}
      />
      <TextField
        error={!!errors.password}
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Input your password"
        helperText={errors.password ? `${errors.password.message}` : ''}
        {...register('password', {
          required: 'Enter your password',
        })}
      />
      <ButtonStyled type="submit" variant="contained">
        Enter
      </ButtonStyled>
      <Typography variant="body1">
        Do you have an account?
        <ButtonAuthNavStyled onClick={() => navigate('/register')}>
          Registration
        </ButtonAuthNavStyled>
      </Typography>
    </>
  );
};

export default LoginPage;
