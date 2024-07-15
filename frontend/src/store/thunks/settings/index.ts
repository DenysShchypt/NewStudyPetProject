import { createAsyncThunk } from '@reduxjs/toolkit';
import { IError } from '../../../common/types/errors';
import { instance, instanceAuth } from '../../../utils/axios';
import {
  IInfoUserState,
  IUpdateUser,
  IUpdateUserPassword,
} from '../../../common/types/tabs';

export const infoUser = createAsyncThunk<
  any,
  // IInfoUserState,
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
export const updateUserPassword = createAsyncThunk<
  void,
  IUpdateUserPassword,
  { rejectValue: string }
>(
  'users/updatePassword',
  async (data: IUpdateUserPassword, { rejectWithValue }) => {
    try {
      await instanceAuth.patch('users/update-user-password', data);
    } catch (error) {
      const typedError = error as IError;
      if (typedError.response && typedError.response.data?.message) {
        return rejectWithValue(typedError.response.data.message);
      } else {
        return rejectWithValue(typedError.message);
      }
    }
  },
);
export const removeUserAccount = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('users/removeUser', async (_, { rejectWithValue }) => {
  try {
    return instanceAuth.delete('users/delete-user');
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
