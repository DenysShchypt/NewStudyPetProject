import {
  Alert,
  AlertColor,
  Box,
  Grid,
  Snackbar,
  TextField,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';
import { RootStylesChangePassword } from './styles';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { updateUserPassword } from '../../store/thunks/settings';
import { IError } from '../../common/types/errors';
import { IUpdateUserPassword } from '../../common/types/tabs';
import { useAppDispatch } from '../../utils/hook';

const ChangePasswordUser: FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [error, setError] = useState<boolean>(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [passwords, setPasswords] = useState<IUpdateUserPassword>({
    password: '',
    newPassword: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.SyntheticEvent,
  ): Promise<void | IError> => {
    event.preventDefault();
    try {
      await dispatch(updateUserPassword(passwords));
      setError(false);
      setSeverity('success');
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    } catch (error) {
      setError(true);
      setSeverity('error');
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
      return error as IError;
    }
  };
  return (
    <RootStylesChangePassword theme={theme}>
      <Grid
        component="form"
        noValidate
        autoComplete="off"
        className="root"
        onSubmit={handleSubmit}
      >
        <Box className="formWrapper">
          <TextField
            className="inputField"
            value={passwords.password}
            onChange={handleChange}
            name="password"
            type="text"
            label="password"
            variant="outlined"
          />
          <TextField
            className="inputField"
            value={passwords.newPassword}
            onChange={handleChange}
            name="newPassword"
            type="text"
            label="newPassword"
            variant="outlined"
          />
          <Box className="buttonBlock">
            <LoadingButtonStyled type="submit">Save</LoadingButtonStyled>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
          {!error
            ? 'This is a success!'
            : 'This is a fail, something is wrong!'}
        </Alert>
      </Snackbar>
    </RootStylesChangePassword>
  );
};

export default ChangePasswordUser;
