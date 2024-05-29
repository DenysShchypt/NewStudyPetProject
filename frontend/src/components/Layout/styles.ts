import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const MainSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const RootBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));
