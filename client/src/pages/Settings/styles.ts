import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { tokens } from '../../theme';
import { StyledProps } from '../../common/types/theme';

export const RootStylesSettings = styled(Grid)<StyledProps>(({ theme }) => {
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  return {
    padding: 32,
    '& .tabsWrapper': {
      borderBottom: `1px solid ${colors.borderColor}`,
    },
  };
});
