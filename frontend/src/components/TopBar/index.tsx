import { FC } from 'react';
import { Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

import { AppBarStyled } from './styles';
import { ITopBarProps } from '../../common/types/topBar';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';

const TopBarComponent: FC<ITopBarProps> = (
  props: ITopBarProps,
): JSX.Element => {
  const theme = useTheme();

  const { isOpen, setIsOpen, isNonMobile } = props;
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
                Welcome {sessionStorage.getItem('name')}
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
