import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance, instanceAuth } from '../../../utils/axios';
export const loginUsers = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const user = await instance.post('auth/login', data);
        localStorage.setItem('token', user.data.token.token);
        return user.data;
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const logoutUsers = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await instanceAuth.get('auth/logout', {
            withCredentials: true,
        });
        localStorage.removeItem('token');
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const registerUsers = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const newUser = await instance.post('auth/register', data);
        localStorage.setItem('token', newUser.data.token.token);
        return newUser.data;
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const refreshUsers = createAsyncThunk('auth/refresh-tokens', async (_, { rejectWithValue }) => {
    try {
        const newUser = await instanceAuth.get('auth/refresh-tokens', {
            withCredentials: true,
        });
        localStorage.setItem('token', newUser.data.token.token);
        return newUser.data;
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const registerAuthGoogleUsers = createAsyncThunk('auth/google', async (data, { rejectWithValue }) => {
    try {
        const newUser = await instance.post('auth/google', data);
        localStorage.setItem('token', newUser.data.token.token);
        return newUser.data;
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
