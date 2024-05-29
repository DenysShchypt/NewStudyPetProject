import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../common/types/auth';

const initialState: IAuthState = {
  user: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    watchList: [
      {
        id: null,
        user: null,
        name: '',
        assetId: '',
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
