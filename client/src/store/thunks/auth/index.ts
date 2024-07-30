import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthGoogleData, IFormData, IFormDataRegister } from '../../../common/types/auth';
import { instance, instanceAuth } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';

export const loginUsers = createAsyncThunk<
  any,
  IFormData,
  { rejectValue: string }
>('auth/login', async (data: IFormData, { rejectWithValue }) => {
  try {
    const user = await instance.post('auth/login', data);
    sessionStorage.setItem('token', user.data.token.token);
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
export const logoutUsers = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await instanceAuth.get('auth/logout', {
      withCredentials: true,
    });
    sessionStorage.removeItem('token');
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
export const registerUsers = createAsyncThunk<
  any,
  IFormDataRegister,
  { rejectValue: string }
>('auth/register', async (data: IFormDataRegister, { rejectWithValue }) => {
  try {
    const newUser = await instance.post('auth/register', data);
    sessionStorage.setItem('token', newUser.data.token.token);
    return newUser.data;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
export const registerAuthGoogleUsers = createAsyncThunk<
  any,
  AuthGoogleData,
  { rejectValue: string }
>('auth/google', async (data: AuthGoogleData, { rejectWithValue }) => {
  try {
    const newUser = await instance.post('auth/google', data);
    sessionStorage.setItem('token',newUser.data.token.token);
    return newUser.data;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
