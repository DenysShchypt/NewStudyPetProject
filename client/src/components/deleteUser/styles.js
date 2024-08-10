import styled from '@emotion/styled';
import { Grid } from '@mui/material';
export const RootStyledDeleteUser = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    '& .tabHeading': {
        width: '100%',
        textAlign: 'center',
        marginBottom: 32,
    },
    '& .alertMessage': {
        width: '100%',
        textAlign: 'center',
        marginBottom: 32,
    },
    '& .checkItem': {
        width: '100%',
        marginBottom: 16,
    },
    '& .buttonBlock': {
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
    },
});
