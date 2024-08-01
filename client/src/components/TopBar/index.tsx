import { FC, useEffect, useRef } from 'react';
import { Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

import { AppBarStyled } from './styles';
import { ITopBarProps } from '../../common/types/topBar';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { refreshUsers } from '../../store/thunks/auth';


const TopBarComponent: FC<ITopBarProps> = (
  props: ITopBarProps,
): JSX.Element => {
  const { isOpen, setIsOpen, isNonMobile } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const firstNameUserAuth: string = useAppSelector(
    state => state.auth.user.firstName,
  );
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (!firstNameUserAuth) {
        dispatch(refreshUsers());
      }
      effectRan.current = true;
    }
  }, [firstNameUserAuth]);
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
                {firstNameUserAuth}
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
