import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { tokens } from '../../theme';
export const BoxStyled = styled(Box, {
    shouldForwardProp: prop => prop !== 'drawerWidth',
})(({ theme, drawerWidth }) => {
    const colors = tokens(theme.palette.mode);
    return {
        '& .navBlock': {
            width: '100%',
            borderBottom: `1px solid ${colors.borderColor}`,
        },
        '& .navMenu': {
            width: drawerWidth,
            '& .MuiDrawer-paper': {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.main,
                boxSizing: 'border-box',
                width: drawerWidth,
            },
        },
        '& .brand': {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '30px 15px',
            cursor: 'pointer',
        },
        '& .brandTitle': {
            color: `${theme.palette.mode === 'dark'
                ? colors.white.DEFAULT
                : colors.black.DEFAULT}`,
        },
        '& .navList': {
            marginBottom: '55px',
        },
        '& .navItem': {
            '&:hover': {
                backgroundColor: '#1900D5 !important',
                color: '#fff',
                borderRadius: '4px',
                '& .MuiSvgIcon-root': {
                    color: `${colors.white.DEFAULT} !important`,
                },
            },
        },
        '& .active': {
            backgroundColor: '#1900D5 !important',
            color: '#fff !important',
            borderRadius: '4px !important',
        },
    };
});
