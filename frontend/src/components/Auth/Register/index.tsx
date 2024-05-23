import { Button, TextField, Typography } from '@mui/material';

const RegisterPage = () => {
  return (
    <>
      <Typography
        variant="h2"
        padding={2}
        fontFamily="Popins"
        textAlign="center"
      >
        Registration
      </Typography>
      <Typography
        variant="body1"
        fontFamily="Popins"
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
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Last name"
        variant="outlined"
        placeholder="Input your last name"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email Address"
        variant="outlined"
        placeholder="Input your email"
      />
      <TextField
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Input your password"
      />
      <TextField
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Input your password"
      />
      <Button
        sx={{
          fontFamily: 'Popins',
          marginTop: 2,
          width: '50%',
          marginBottom: 2,
        }}
        variant="contained"
      >
        Registration
      </Button>
      <Typography variant="body1" sx={{ fontFamily: 'Popins' }}>
        If you have an account? <span className="registrationText">Enter</span>
      </Typography>
    </>
  );
};

export default RegisterPage;
