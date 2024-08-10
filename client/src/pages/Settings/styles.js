import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { tokens } from '../../theme';
export const RootStylesSettings = styled(Grid)(({ theme }) => {
    const colors = tokens(theme.palette.mode);
    return {
        padding: 32,
        '& .tabsWrapper': {
            borderBottom: `1px solid ${colors.borderColor}`,
        },
    };
});
