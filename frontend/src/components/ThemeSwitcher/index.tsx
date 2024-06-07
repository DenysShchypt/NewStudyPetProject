import { FC, useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { DarkMode, LightMode, NotificationsNone } from '@mui/icons-material';
import { ColorModeContext } from '../../theme';
import { ThemeStyles } from './styles';

const ThemeSwitcher: FC = (): JSX.Element => {
  const colorMode: any = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <ThemeStyles onClick={colorMode.toggleColorMode}>
      <IconButton>
        {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
      <IconButton>
        <NotificationsNone />
      </IconButton>
    </ThemeStyles>
  );
};

export default ThemeSwitcher;
