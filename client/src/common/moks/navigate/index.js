import { jsx as _jsx } from "react/jsx-runtime";
import { HomeOutlined, TimelineOutlined, MenuBookOutlined, SettingsOutlined, } from '@mui/icons-material';
export const navMenu = [
    {
        name: 'Main',
        icon: _jsx(HomeOutlined, {}),
        path: '/',
        id: 1,
    },
    {
        name: 'Favorites',
        icon: _jsx(TimelineOutlined, {}),
        path: '/watchList',
        id: 2,
    },
    {
        name: 'News',
        icon: _jsx(MenuBookOutlined, {}),
        path: '/news',
        id: 3,
    },
    {
        name: 'Settings',
        icon: _jsx(SettingsOutlined, {}),
        path: '/settings',
        id: 4,
    },
];
