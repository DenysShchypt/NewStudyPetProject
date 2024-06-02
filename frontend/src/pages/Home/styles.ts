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
  };
});
