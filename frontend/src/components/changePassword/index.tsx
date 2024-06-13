import { Box, Grid, TextField, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import { RootStylesChangePassword } from './styles';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { updateUserPassword } from '../../store/thunks/settings';
import { IError } from '../../common/types/errors';
import { IUpdateUserPassword } from '../../common/types/tabs';
import { useAppDispatch } from '../../utils/hook';

const ChangePasswordUser: FC = (): JSX.Element => {
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
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void | IError> => {
    event.preventDefault();
    try {
      await dispatch(updateUserPassword(passwords));
    } catch (error) {
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
    </RootStylesChangePassword>
  );
};

export default ChangePasswordUser;
