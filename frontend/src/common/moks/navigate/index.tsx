import {
  HomeOutlined,
  TimelineOutlined,
  MenuBookOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

export const navMenu = [
  {
    name: 'Main',
    icon: <HomeOutlined />,
    path: '/',
    id: 1,
  },
  {
    name: 'Favorites',
    icon: <TimelineOutlined />,
    path: '/watchList',
    id: 2,
  },
  {
    name: 'News',
    icon: <MenuBookOutlined />,
    path: '/news',
    id: 3,
  },
  {
    name: 'Settings',
    icon: <SettingsOutlined />,
    path: '/settings',
    id: 4,
  },
];
