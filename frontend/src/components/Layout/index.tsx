import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ILayout } from '../../common/types/layout';
import TopBarComponent from '../TopBar';
import { Box, useMediaQuery } from '@mui/material';
import SideBarComponent from '../SideBar';
import { useStyles } from './styles';

const LayoutComponent: React.FC<ILayout> = ({ children }: ILayout) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const location = useLocation();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  return location.pathname === '/login' || location.pathname === '/register' ? (
    <>{children}</>
  ) : (
    <Box
      display={isNonMobile ? 'flex' : 'block'}
      width="100%"
      height="100%"
      justifyContent="space-between"
    >
      <SideBarComponent
        isNonMobile={isNonMobile}
        drawerWidth="250"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box className={classes.mainSection}>
        <TopBarComponent />
        {children}
      </Box>
    </Box>
  );
};

export default LayoutComponent;
