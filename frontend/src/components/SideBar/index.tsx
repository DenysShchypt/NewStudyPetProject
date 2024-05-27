import React, { useEffect, useState } from 'react';
import { useStyles } from '../TopBar/styles';
import {
  HomeOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  TimelineOutlined,
  MenuBookOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from '../FlexBetween';

const SideBarComponent = (props: any) => {
  const [active, setActive] = useState<string>('');
  const { isNonMobile, drawerWidth, isOpen, setIsOpen } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '&.MuiDrawer-paper': {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box>
              <FlexBetween>
                <Box display="flex" alignItems="center" gap="10px">
                  <Typography>Demo</Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBarComponent;
