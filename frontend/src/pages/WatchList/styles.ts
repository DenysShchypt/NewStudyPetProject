import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { tokens } from '../../theme';
import { StyledProps } from '../../common/types/theme';

export const RootGrid = styled(Grid)<StyledProps>(({ theme }) => {
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  return {
    padding: '10px 20px',
    '& .watchListHeading': {
      textAlign: 'center',
    },
    '& .heading': {
      margin: '25px 0 !important',
    },
    '& .assetsTableBlock': {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '20px 16px',
      marginBottom: 32,
      minHeight: 270,
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 12,
      '& .MuiPaper-root': {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
        backgroundImage: 'none !important',
      },
    },
  };
});
