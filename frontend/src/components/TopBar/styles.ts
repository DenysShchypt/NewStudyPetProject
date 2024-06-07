import { AppBar } from '@mui/material';
import styled from '@emotion/styled';
import { tokens } from '../../theme';
import { StyledProps } from '../../common/types/theme';

export const AppBarStyled = styled(AppBar)<StyledProps>(({ theme }) => {
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
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
