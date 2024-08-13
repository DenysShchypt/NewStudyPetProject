import { FC, useEffect, useRef } from 'react';
import { Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

import { AppBarStyled } from './styles';
import { ITopBarProps } from '../../common/types/topBar';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { infoUser } from '../../store/thunks/settings';
import { refreshUsers } from '../../store/thunks/auth';

const TopBarComponent: FC<ITopBarProps> = (
  props: ITopBarProps,
): JSX.Element => {
  const { isOpen, setIsOpen, isNonMobile } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const firstNameUser: string = useAppSelector(
    state => state.settings.user.firstName,
  );
  const userVerify: string = useAppSelector(
    state => state.auth.user.verifyLink,
  );

  useEffect(() => {
        dispatch(refreshUsers());
  }, [dispatch]);
  return (
    <AppBarStyled theme={theme}>
      <Toolbar className="toolbar">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sm={6} lg={6}>
            <FlexBetween>
              <MenuOutlined
                className="menuIcon"
                onClick={() => setIsOpen(!isOpen)}
              />
              {userVerify === 'active' ? (
                <Typography variant="h3">
                  Welcome {firstNameUser}
                </Typography>
              ) : (
                <Typography variant="h3" className="menuIcon">
                  You need to verify your account via email
                </Typography>
              )}
            </FlexBetween>
          </Grid>
          {isNonMobile && (
            <Grid item display="flex" sm={5} lg={5} justifyContent="flex-end">
              <ThemeSwitcher />
              <SearchBar />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBarStyled>
  );
};

export default TopBarComponent;
