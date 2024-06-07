import { TextField, Typography } from '@mui/material';
import { IPropsRegister } from '../../../common/types/auth';
import {
  ButtonAuthNavStyled,
  LoadingButtonStyled,
} from '../../../components/GeneralComponentsStyles';

const RegisterPage: React.FC<IPropsRegister> = (
  props: IPropsRegister,
): JSX.Element => {
  const { navigate, register, errors, loading } = props;
  return (
    <>
      <Typography variant="h2" padding={2} textAlign="center">
        Registration
      </Typography>
      <Typography variant="body1" textAlign="center" marginBottom={3}>
        Write down your details
      </Typography>
      <TextField
        error={!!errors.firstName}
        fullWidth={true}
        margin="normal"
        label="Your first name"
        variant="outlined"
        placeholder="Input your first name"
        helperText={errors.firstName ? `${errors.firstName.message}` : ''}
        {...register('firstName', {
          required: 'Enter your firstName',
        })}
      />
      <TextField
        error={!!errors.lastName}
        fullWidth={true}
        margin="normal"
        label="Last name"
        variant="outlined"
        placeholder="Input your last name"
        helperText={errors.lastName ? `${errors.lastName.message}` : ''}
        {...register('lastName', {
          required: 'Enter your lastName',
        })}
      />
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
      <TextField
        error={!!errors.repeatPassword}
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Input your password"
        helperText={
          errors.repeatPassword ? `${errors.repeatPassword.message}` : ''
        }
        {...register('repeatPassword', {
          required: 'Enter your repeat password',
        })}
      />
      <LoadingButtonStyled loading={loading} type="submit" variant="contained">
        Registration
      </LoadingButtonStyled>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
        If you have an account?{' '}
        <ButtonAuthNavStyled onClick={() => navigate('/login')}>
          Enter
        </ButtonAuthNavStyled>
      </Typography>
    </>
  );
};

export default RegisterPage;
