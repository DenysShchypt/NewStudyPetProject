import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../../../common/types/errors';
import { instanceAuth } from '../../../utils/axios';
import { IInfoUserState, IUpdateUser } from '../../../common/types/tabs';

export const infoUser = createAsyncThunk<
  IInfoUserState,
  void,
  { rejectValue: string }
>('users/info', async (_, { rejectWithValue }) => {
  try {
    const user = await instanceAuth.get('users/user-info');
    return user.data;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
export const updateUser = createAsyncThunk<
  IUpdateUser,
  IUpdateUser,
  { rejectValue: string }
>('users/update', async (data: IUpdateUser, { rejectWithValue }) => {
  try {
    const user = await instanceAuth.patch('users/update-user', data);
    console.log(user.data);
    return user.data;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
