import { useContext } from 'react';
import { Box, Grid, IconButton, InputBase, useTheme } from '@mui/material';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useAppSelector } from '../../utils/hook';
import { ColorModeContext } from '../../theme';
import { useStyles } from './styles';

const TopBarComponent: React.FC = (): JSX.Element => {
  const { user } = useAppSelector(state => state.auth);
  console.log(user);

  const theme = useTheme();
  const colorMode: any = useContext(ColorModeContext);
  const classes = useStyles();
  return (
    <Box className={classes.root} position="static">
      {user && <Grid>Welcome {user.firstName}</Grid>}
      <Box display="flex">
        <Grid onClick={colorMode.toggleColorMode} className={classes.iconBlock}>
          <IconButton className={classes.themeIcon}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeSharpIcon />
            ) : (
              <LightModeSharpIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsNoneSharpIcon />
          </IconButton>
        </Grid>
        <Grid className={classes.searchBlock}>
          <IconButton className={classes.searchIcon}>
            <SearchSharpIcon />
          </IconButton>
          <InputBase className={classes.searchInput} placeholder="Search" />
        </Grid>
      </Box>
    </Box>
  );
};

export default TopBarComponent;
