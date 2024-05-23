import { Button, TextField, Typography } from '@mui/material';

const LoginPage = (props: any) => {
  const { setEmail, setPassword } = props;
  return (
    <>
      <Typography
        variant="h2"
        padding={2}
        fontFamily="Popins"
        textAlign="center"
      >
        Authorization
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Popins"
        textAlign="center"
        marginBottom={3}
      >
        Write down your login and password
      </Typography>
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
      <Button
        type="submit"
        sx={{
          fontFamily: 'Popins',
          marginTop: 2,
          width: '50%',
          marginBottom: 2,
        }}
        variant="contained"
      >
        Enter
      </Button>
      <Typography variant="body1" sx={{ fontFamily: 'Popins' }}>
        Do you have an account?{' '}
        <span className="registrationText">Registration</span>
      </Typography>
    </>
  );
};

export default LoginPage;
