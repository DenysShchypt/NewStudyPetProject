import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../common/types/auth';
import {
  loginUsers,
  logoutUsers,
  refreshUsers,
  registerAuthGoogleUsers,
  registerUsers,
} from '../../thunks/auth';

const initialState: IAuthState = {
  user: {
    wallet: 0,
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    roles: [],
    token: localStorage.getItem('token') || '',
    verifyLink: '',
  },
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
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
      .addCase(loginUsers.rejected, state => {
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
      .addCase(registerUsers.rejected, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(registerAuthGoogleUsers.pending, state => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(registerAuthGoogleUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerAuthGoogleUsers.rejected, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(refreshUsers.pending, state => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(refreshUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUsers.rejected, state => {
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUsers.fulfilled, _state => {
        return { ...initialState, isLoading: false };
      })
      .addCase(logoutUsers.rejected, state => {
        state.isLoading = false;
      });
  },
});
export const { setLoading } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
