import { Box, Grid, TextField, Typography, useTheme } from '@mui/material';
import { IPropsLogin } from '../../../common/types/auth';
import {
  ButtonAuthNavStyled,
  LoadingButtonStyled,
} from '../../../components/GeneralComponentsStyles';
import { RootStylesLogin } from './styles';

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors, loading } = props;
  const theme = useTheme();
  return (
    <RootStylesLogin theme={theme}>
      <Grid className="root">
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
        <Box className="buttonBlock">
          <LoadingButtonStyled
            loading={loading}
            type="submit"
            variant="contained"
          >
            Enter
          </LoadingButtonStyled>
        </Box>
        <Box className="redirection">
          <Typography variant="body1">
            Do you have an account?
            <ButtonAuthNavStyled onClick={() => navigate('/register')}>
              Registration
            </ButtonAuthNavStyled>
          </Typography>
        </Box>
      </Grid>
    </RootStylesLogin>
  );
};

export default LoginPage;
