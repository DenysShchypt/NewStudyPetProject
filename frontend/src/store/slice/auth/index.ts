import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../common/types/auth';
import { loginUsers, registerUsers } from '../../thunks/auth';

const initialState =
  // : IAuthState
  {
    user: {
      wallet: 0,
      email: '',
      firstName: '',
      lastName: '',
      id: '',
      roles: [],
      token: sessionStorage.getItem('token') || null,
    },
    // status: 'idle',
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
    // .addCase(refreshAccessToken.pending, state => {
    //   state.status = 'loading';
    // })
    // .addCase(refreshAccessToken.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.user.token = action.payload.accessToken;
    // })
    // .addCase(refreshAccessToken.rejected, (state, action) => {
    //   state.status = 'failed';
    // });
  },
});
export const { setLoading } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
