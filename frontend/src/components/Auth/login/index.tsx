/* eslint-disable no-useless-escape */
import { Button, TextField, Typography } from '@mui/material';
import { IPropsLogin } from '../../../common/types/auth';

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props;
  return (
    <>
      <Typography
        variant="h2"
        padding={2}
        fontFamily="Poppins"
        textAlign="center"
      >
        Authorization
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Poppins"
        textAlign="center"
        marginBottom={3}
      >
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
      <Button
        type="submit"
        sx={{
          fontFamily: 'Poppins',
          marginTop: 2,
          width: '50%',
          marginBottom: 2,
        }}
        variant="contained"
      >
        Enter
      </Button>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
        Do you have an account?{' '}
        <span
          className="registrationText"
          onClick={() => navigate('/register')}
        >
          Registration
        </span>
      </Typography>
    </>
  );
};

export default LoginPage;
