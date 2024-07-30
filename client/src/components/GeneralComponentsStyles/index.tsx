import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

export const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const LoadingButtonStyled = styled(LoadingButton)({
  borderRadius: 4,
  background: '#1900D5 !important',
  padding: '10px 20px !important',
  marginTop: 12,
  width: '30%',
  color: 'white',
});
export const ButtonAuthNavStyled = styled.span`
  color: #1900d5;
  margin-left: 10px;
  cursor: pointer;
`;
