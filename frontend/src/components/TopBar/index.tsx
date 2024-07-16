import { FC, useEffect } from 'react';
import { Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

import { AppBarStyled } from './styles';
import { ITopBarProps } from '../../common/types/topBar';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { infoUser } from '../../store/thunks/settings';

const TopBarComponent: FC<ITopBarProps> = (
  props: ITopBarProps,
): JSX.Element => {
  const { isOpen, setIsOpen, isNonMobile } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const firstNameUserAuth: string = useAppSelector(
    state => state.auth.user.firstName,
  );
  const firstNameUserInfo: string = useAppSelector(
    state => state.settings.user.firstName,
  );
  useEffect(() => {
    dispatch(infoUser());
  }, [dispatch]);
  return (
    <AppBarStyled theme={theme}>
      <Toolbar className="toolbar">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sm={3} lg={3}>
            <FlexBetween>
              <MenuOutlined
                className="menuIcon"
                onClick={() => setIsOpen(!isOpen)}
              />
              <Typography variant="h3">
                Welcome{' '}
                {firstNameUserAuth ? firstNameUserAuth : firstNameUserInfo}
              </Typography>
            </FlexBetween>
          </Grid>
          {isNonMobile && (
            <Grid item display="flex" sm={9} lg={9} justifyContent="flex-end">
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
