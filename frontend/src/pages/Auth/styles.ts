import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const RootStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  .form {
    flex: 1;
  }
`;
export const BoxFormStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '640px',
  margin: 'auto',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '5px 5px 10px rgb(109, 108, 108)',
});
