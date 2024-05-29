import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBarComponent from '../TopBar';
import { Box, useMediaQuery } from '@mui/material';
import SideBarComponent from '../SideBar';
import { useStyles } from './styles';

const LayoutComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  return location.pathname === '/login' || location.pathname === '/register' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Box
      display={isNonMobile ? 'flex' : 'block'}
      width="100%"
      height="100%"
      justifyContent="space-between"
    >
      <SideBarComponent
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box className={classes.mainSection}>
        <TopBarComponent isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutComponent;
