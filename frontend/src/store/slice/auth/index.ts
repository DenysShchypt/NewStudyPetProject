import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../common/types/auth';
import { loginUsers, registerUsers } from '../../thunks/auth';

const initialState: IAuthState = {
  user: {
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      createdAt: '',
      updatedAt: '',
      watchList: [
        {
          id: 0,
          user: 0,
          name: '',
          assetId: 0,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUsers.pending, state => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(registerUsers.pending, state => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});

export const authSliceReducer = authSlice.reducer;
