import { FC, useEffect, useState } from 'react';
import { IUpdateUser } from '../../common/types/tabs';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { RootStylesPersonalInfo } from './styles';
import {
  Alert,
  AlertColor,
  Box,
  Grid,
  Snackbar,
  TextField,
  useTheme,
} from '@mui/material';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { updateUser } from '../../store/thunks/settings';
import { IError } from '../../common/types/errors';

const SettingsPersonalInfoComponent: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const currentUser = useAppSelector(state => state.settings.user);
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [error, setError] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUpdateUser>({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });

  useEffect(() => {
    setUserData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    });
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (
    event: React.SyntheticEvent,
  ): Promise<void | IError> => {
    event.preventDefault();

    try {
      await dispatch(updateUser(userData));
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
    <RootStylesPersonalInfo theme={theme}>
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
            value={userData.firstName}
            onChange={handleChange}
            name="firstName"
            type="text"
            label="firstName"
            variant="outlined"
          />
          {userData.lastName&&<TextField
            className="inputField"
            value={userData.lastName}
            onChange={handleChange}
            name="lastName"
            type="text"
            label="lastName"
            variant="outlined"
          />}
          <TextField
            className="inputField"
            value={userData.email}
            onChange={handleChange}
            name="email"
            type="text"
            label="email"
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
    </RootStylesPersonalInfo>
  );
};

export default SettingsPersonalInfoComponent;
