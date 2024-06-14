import { FC, useEffect, useState } from 'react';
import {
  ChevronLeftOutlined,
  LogoutOutlined,
  PortraitOutlined,
} from '@mui/icons-material';
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { navMenu } from '../../common/moks/navigate';
import { BoxStyled } from './styles';
import Logo from '../../assets/images/sideBar/Logo.svg';
import { ISideBarProps } from '../../common/types/sideBar';
import { FlexBetween } from '../GeneralComponentsStyles';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchBar from '../SearchBar';

const SideBarComponent: FC<ISideBarProps> = (
  props: ISideBarProps,
): JSX.Element => {
  const [active, setActive] = useState<string>('');
  const { isNonMobile, drawerWidth, isOpen, setIsOpen } = props;
  const location: Location = useLocation();
  const { pathname } = location;
  const navigate: NavigateFunction = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  return (
    <BoxStyled theme={theme} component="nav" drawerWidth={drawerWidth}>
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          variant="persistent"
          anchor="left"
          className="navMenu"
        >
          <Box className="navBlock">
            <Box>
              <FlexBetween>
                <Box className="brand">
                  <img src={Logo} alt="Logo app" />
                  <Typography variant="h1" className="brandTitle">
                    Demo
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            {!isNonMobile && (
              <ListItem>
                <Box>
                  <SearchBar />
                </Box>
              </ListItem>
            )}
            <List className="navList">
              {navMenu.map(element => {
                return (
                  <ListItem key={element.id}>
                    <ListItemButton
                      onClick={() => navigate(`${element.path}`)}
                      className={
                        active === element.path ? 'navItem active' : 'navItem'
                      }
                    >
                      <ListItemIcon>{element.icon}</ListItemIcon>
                      <ListItemText>
                        <Typography>{element.name}</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemButton onClick={() => {}} className="navItem">
                  <ListItemIcon>
                    <PortraitOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>User</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate('/login');
                    sessionStorage.removeItem('token');
                  }}
                  className="navItem"
                >
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>Logout</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              {!isNonMobile && (
                <ListItem>
                  <Box paddingLeft="6px">
                    <ThemeSwitcher />
                  </Box>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </BoxStyled>
  );
};

export default SideBarComponent;
