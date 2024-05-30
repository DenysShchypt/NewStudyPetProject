import { useContext } from 'react';
import {
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
import FlexBetween from '../FlexBetween';
import { AppBarStyled } from './styles';

const TopBarComponent = (props: any) => {
  const { user } = useAppSelector(state => state.auth.user);
  const theme = useTheme();
  const colorMode: any = useContext(ColorModeContext);
  const { isOpen, setIsOpen } = props;
  return (
    <AppBarStyled theme={theme}>
      <Toolbar className="toolbar">
        <FlexBetween>
          <MenuOutlined
            className="menuIcon"
            onClick={() => setIsOpen(!isOpen)}
          />
          <Typography variant="h3">Welcome {user.firstName}</Typography>
        </FlexBetween>
        <Box display="flex">
          <Grid onClick={colorMode.toggleColorMode} className="iconBlock">
            <IconButton className="themeIcon">
              {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
            <IconButton>
              <NotificationsNone />
            </IconButton>
          </Grid>
        </Box>
        <Grid className="searchBlock">
          <IconButton className="searchIcon">
            <Search />
          </IconButton>
          <InputBase className="searchInput" placeholder="Search" />
        </Grid>
      </Toolbar>
    </AppBarStyled>
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
