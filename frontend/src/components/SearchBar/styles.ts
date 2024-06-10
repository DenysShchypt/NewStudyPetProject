import styled from '@emotion/styled';
import { Grid, useTheme } from '@mui/material';
import { tokens } from '../../theme';

export const SearchStyles = styled(Grid)(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  return {
    display: 'flex',
    maxHeight: '45px',
    borderRadius: '8px',
    backgroundColor: `${colors.primary[600]}`,
    '& .searchIcon': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .searchInput': {
      padding: '18px 12px',
    },
  };
});
