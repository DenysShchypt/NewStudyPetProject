import { createSlice } from '@reduxjs/toolkit';
import { IInfoUserState } from '../../../common/types/tabs';
import { infoUser } from '../../thunks/settings';

const initialState: IInfoUserState = {
  user: {
    wallet: 0,
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    roles: [],
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(infoUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const settingsSliceReducer = settingsSlice.reducer;
