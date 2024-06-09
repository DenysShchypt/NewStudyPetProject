import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFormData, IFormDataRegister } from '../../../common/types/auth';
import { instance } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';

export const loginUsers = createAsyncThunk<
  any, // Можна замінити any на конкретний тип результату успішного виконання
  IFormData,
  { rejectValue: string }
>('auth/login', async (data: IFormData, { rejectWithValue }) => {
  try {
    const user = await instance.post('auth/login', data);
    sessionStorage.setItem('token', user.data.token);
    sessionStorage.setItem('name', user.data.user.firstName);
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
  any, // Можна замінити any на конкретний тип результату успішного виконання
  IFormDataRegister,
  { rejectValue: string }
>('auth/register', async (data: IFormDataRegister, { rejectWithValue }) => {
  try {
    const newUser = await instance.post('auth/register', data);
    sessionStorage.setItem('token', newUser.data.token);
    sessionStorage.setItem('name', newUser.data.user.firstName);
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
