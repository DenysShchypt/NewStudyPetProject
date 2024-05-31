import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

export const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

// export const ButtonStyled = styled(Button)({
//   borderRadius: 4,
//   background: '#1900D5 !important',
//   padding: '10px 20px !important',
//   marginBottom: 8,
//   marginTop: 8,
//   width: '30%',
// });
export const LoadingButtonStyled = styled(LoadingButton)({
  borderRadius: 4,
  background: '#1900D5 !important',
  padding: '10px 20px !important',
  marginBottom: 8,
  marginTop: 8,
  width: '30%',
});
export const ButtonAuthNavStyled = styled.span`
  color: #1900d5;
  margin-left: 10px;
  cursor: pointer;
`;
