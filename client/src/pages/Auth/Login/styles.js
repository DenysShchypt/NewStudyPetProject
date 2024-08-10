import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { tokens } from '../../../theme';
export const RootStylesLogin = styled(Grid)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        '& .root': {
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: colors.blue,
                },
            },
            '& label.Mui-focused': {
                color: `${theme.palette.mode === 'dark'
                    ? colors.white.DEFAULT
                    : colors.black.DEFAULT}`,
            },
        },
        '& .redirection': {
            textAlign: 'center',
            marginTop: '8px',
        },
        '& .google': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px',
        },
        '& .buttonBlock': {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
    };
});
