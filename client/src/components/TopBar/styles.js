import { AppBar } from '@mui/material';
import styled from '@emotion/styled';
import { tokens } from '../../theme';
export const AppBarStyled = styled(AppBar)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        position: 'static',
        background: `${colors.primary.DEFAULT} !important`,
        borderBottom: `1px solid ${colors.borderColor}`,
        boxShadow: 'none !important',
        '& .toolbar': {
            justifyContent: 'space-between',
            padding: '25px 45px',
        },
        '& .menuIcon': {
            marginRight: '10px',
            cursor: 'pointer',
        },
    };
});
