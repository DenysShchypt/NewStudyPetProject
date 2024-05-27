import { useContext } from 'react';
import { Box, Grid, IconButton, InputBase, useTheme } from '@mui/material';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useAppSelector } from '../../utils/hook';
import { ColorModeContext, tokens } from '../../theme';
import { useStyles } from './styles';

const TopBarComponent = () => {
  const { user } = useAppSelector(state => state.auth.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode: any = useContext(ColorModeContext);
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between" px="32px" py="32px">
      {user && <Grid>Welcome {user.firstName}</Grid>}
      <Box display="flex">
        <Grid
          onClick={colorMode.toggleColorMode}
          sx={{
            pr: '37px',
            borderRight: `1px solid ${colors.primary[600]}`,
          }}
        >
          <IconButton sx={{ mr: '45px' }}>
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
        <Grid
          sx={{
            display: 'flex',
            backgroundColor: `${colors.primary[600]}`,
            borderRadius: '8px',
            ml: '28px',
          }}
        >
          <IconButton className={classes.root}>
            <SearchSharpIcon />
          </IconButton>
          <InputBase
            placeholder="Search"
            sx={{
              px: '18px',
              py: '12px',
            }}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default TopBarComponent;
