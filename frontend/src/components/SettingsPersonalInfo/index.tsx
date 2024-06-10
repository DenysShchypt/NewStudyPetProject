import { FC, useState } from 'react';
import { IUpdateUser } from '../../common/types/tabs';
import { useAppSelector } from '../../utils/hook';
import { RootStylesPersonalInfo } from './styles';
import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';

const SettingsPersonalInfoComponent: FC = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<IUpdateUser>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const theme = useTheme();
  const { user } = useAppSelector(state => state.auth);

  return (
    <RootStylesPersonalInfo theme={theme}>
      <Grid component="form" noValidate autoComplete="off" className="root">
        <Box className="formWrapper">
          <TextField
            className="inputField"
            type="text"
            label="first Name"
            variant="outlined"
          />
          <TextField
            className="inputField"
            type="text"
            label="lastName"
            variant="outlined"
          />
          <TextField
            className="inputField"
            type="text"
            label="email"
            variant="outlined"
          />
          <Box className="buttonBlock">
            <LoadingButtonStyled>Save</LoadingButtonStyled>
          </Box>
        </Box>
      </Grid>
    </RootStylesPersonalInfo>
  );
};

export default SettingsPersonalInfoComponent;
