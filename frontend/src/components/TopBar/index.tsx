import { useContext } from 'react';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  LightMode,
  DarkMode,
  NotificationsNone,
  Search,
  MenuOutlined,
} from '@mui/icons-material';
import { useAppSelector } from '../../utils/hook';
import { ColorModeContext } from '../../theme';
import { useStyles } from './styles';
import FlexBetween from '../FlexBetween';

const TopBarComponent = (props: any) => {
  const { user } = useAppSelector(state => state.auth.user);
  const theme = useTheme();
  const colorMode: any = useContext(ColorModeContext);
  const classes = useStyles();
  const { isOpen, setIsOpen } = props;
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <FlexBetween>
          <MenuOutlined
            className={classes.menuIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
          <Typography variant="h3">Welcome {user.firstName}</Typography>
        </FlexBetween>
        <Box display="flex">
          <Grid
            onClick={colorMode.toggleColorMode}
            className={classes.iconBlock}
          >
            <IconButton className={classes.themeIcon}>
              {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
            <IconButton>
              <NotificationsNone />
            </IconButton>
          </Grid>
        </Box>
        <Grid className={classes.searchBlock}>
          <IconButton className={classes.searchIcon}>
            <Search />
          </IconButton>
          <InputBase className={classes.searchInput} placeholder="Search" />
        </Grid>
      </Toolbar>
    </AppBar>
    // <Box className={classes.root} position="static">
    //   {user && <Grid>Welcome {user.firstName}</Grid>}
    //   <Box display="flex">
    //     <Grid onClick={colorMode.toggleColorMode} className={classes.iconBlock}>
    //       <IconButton className={classes.themeIcon}>
    //         {theme.palette.mode === 'dark' ? (
    //           <DarkModeSharpIcon />
    //         ) : (
    //           <LightModeSharpIcon />
    //         )}
    //       </IconButton>
    //       <IconButton>
    //         <NotificationsNoneSharpIcon />
    //       </IconButton>
    //     </Grid>
    //     <Grid className={classes.searchBlock}>
    //       <IconButton className={classes.searchIcon}>
    //         <SearchSharpIcon />
    //       </IconButton>
    //       <InputBase className={classes.searchInput} placeholder="Search" />
    //     </Grid>
    //   </Box>
    // </Box>
  );
};

export default TopBarComponent;
