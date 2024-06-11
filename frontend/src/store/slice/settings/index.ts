import { createSlice } from '@reduxjs/toolkit';
import { IInfoUserState } from '../../../common/types/tabs';
import { infoUser, updateUser } from '../../thunks/settings';

const initialState: IInfoUserState = {
  user: {
    createdAt: '',
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    updatedAt: '',
    watchList: [],
  },
  token: '',
  userUpdate: {
    email: '',
    firstName: '',
    lastName: '',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(infoUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdate = action.payload;
      });
  },
});

export const settingsSliceReducer = settingsSlice.reducer;
