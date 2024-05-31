import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../common/types/auth';
import { loginUsers, registerUsers } from '../../thunks/auth';

const initialState: IAuthState = {
  user: {
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
    token: '',
  },
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUsers.pending, state => {
      state.isLoggedIn = false;
      state.isLoading = true;
    });
    builder.addCase(loginUsers.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(loginUsers.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });
    builder.addCase(registerUsers.pending, state => {
      state.isLoggedIn = false;
      state.isLoading = true;
    });
    builder.addCase(registerUsers.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(registerUsers.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
