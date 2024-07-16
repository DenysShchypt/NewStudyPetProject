import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { RootStyledDeleteUser } from './styles';
import { tokens } from '../../theme';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { removeUserAccount } from '../../store/thunks/settings';
import { setLoading } from '../../store/slice/auth';

const RemoveUser: FC = (): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const userId: string = useAppSelector(state => state.settings.user.id);

  const handleDelete = async (): Promise<void> => {
    await dispatch(removeUserAccount(userId));
    sessionStorage.removeItem('token');
    dispatch(setLoading(false));
    navigate('/login');
  };
  return (
    <RootStyledDeleteUser container>
      <Grid item className="tabHeading">
        <Typography variant="h2">Delete Account</Typography>
      </Grid>
      <Grid item className="alertMessage">
        <Typography variant="body1">
          Are you sure you want to delete your account?
        </Typography>
      </Grid>
      <Grid item className="checkItem">
        <FormGroup>
          <FormControlLabel
            sx={{ justifyContent: 'center' }}
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                sx={{
                  color: colors.blue,
                  '&.Mui-checked': { color: colors.blue },
                }}
              />
            }
            label="I agree with rules"
          />
        </FormGroup>
      </Grid>
      <Grid item className="buttonBlock">
        <LoadingButtonStyled
          onClick={handleDelete}
          disabled={!checked}
          type="submit"
        >
          Delete user
        </LoadingButtonStyled>
      </Grid>
    </RootStyledDeleteUser>
  );
};

export default RemoveUser;
