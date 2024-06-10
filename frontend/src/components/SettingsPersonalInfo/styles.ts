import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { tokens } from '../../theme';
import { StyledProps } from '../../common/types/theme';

export const RootStylesPersonalInfo = styled(Grid)<StyledProps>(({ theme }) => {
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  return {
    '& .root': {
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: colors.blue,
        },
      },
      '& label.Mui-focused': {
        color: `${
          theme.palette.mode === 'dark'
            ? colors.white.DEFAULT
            : colors.black.DEFAULT
        }`,
      },
    },
    '& .inputField': {
      width: '25%',
      marginBottom: '15px !important',
    },
    '& .formWrapper': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0',
    },
    '& .buttonBlock': {
      width: '40%',
      display: 'flex',
      justifyContent: 'center',
    },
  };
});
