import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFormData, IFormDataRegister } from '../../../common/types/auth';
import { instance } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';

export const loginUsers = createAsyncThunk<
  any,
  IFormData,
  { rejectValue: string }
>('auth/login', async (data: IFormData, { rejectWithValue }) => {
  try {
    const user = await instance.post('auth/login', data);
    sessionStorage.setItem('token', user.data.token);
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
export const registerUsers = createAsyncThunk<
  any,
  IFormDataRegister,
  { rejectValue: string }
>('auth/register', async (data: IFormDataRegister, { rejectWithValue }) => {
  try {
    const newUser = await instance.post('auth/register', data);
    sessionStorage.setItem('token', newUser.data.token);
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
