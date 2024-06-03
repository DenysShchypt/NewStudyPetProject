import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { tokens } from '../../theme';
import { StyledProps } from '../../common/types/theme';

export const BoxStyled = styled(Box)<StyledProps>(({ theme }) => {
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  return {
    flexGrow: 1,
    padding: '32px',
    '& .topCardItem': {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '20px 16px',
      minHeight: 185,
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 12,
    },
    '& .assetName': {
      fontSize: 25,
      fontWeight: 600,
      lineHeight: '30px',
    },
    '& .itemDetails': {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: '20px',
    },
    '& .cardPrice': {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: '48px',
    },
    '& .cardCapitalize': {
      color: `${colors.secondary.DEFAULT}`,
      fontSize: 18,
      fontWeight: 400,
      lineHeight: '22px',
    },
  };
});
