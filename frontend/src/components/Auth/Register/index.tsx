import { Button, TextField, Typography } from '@mui/material';
import { IPropsRegister } from '../../../common/types/auth';

const RegisterPage: React.FC<IPropsRegister> = (
  props: IPropsRegister,
): JSX.Element => {
  const {
    setEmail,
    setPassword,
    setRepeatPassword,
    setFirstName,
    setLastName,
  } = props;
  return (
    <>
      <Typography
        variant="h2"
        padding={2}
        fontFamily="Poppins"
        textAlign="center"
      >
        Registration
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Poppins"
        textAlign="center"
        marginBottom={3}
      >
        Write down your details
      </Typography>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Your first name"
        variant="outlined"
        placeholder="Input your first name"
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Last name"
        variant="outlined"
        placeholder="Input your last name"
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email Address"
        variant="outlined"
        placeholder="Input your email"
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Input your password"
        onChange={e => setPassword(e.target.value)}
      />
      <TextField
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Input your password"
        onChange={e => setRepeatPassword(e.target.value)}
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
        Registration
      </Button>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
        If you have an account? <span className="registrationText">Enter</span>
      </Typography>
    </>
  );
};

export default RegisterPage;
