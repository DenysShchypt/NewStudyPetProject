import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAuth } from '../../../utils/axios';
export const infoUser = createAsyncThunk('users/info', async (_, { rejectWithValue }) => {
    try {
        const user = await instanceAuth.get('users/user-info');
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
export const updateUser = createAsyncThunk('users/update', async (data, { rejectWithValue }) => {
    try {
        const user = await instanceAuth.patch('users/update-user', data);
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
export const updateUserPassword = createAsyncThunk('users/updatePassword', async (data, { rejectWithValue }) => {
    try {
        await instanceAuth.patch('users/update-user-password', data);
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
export const removeUserAccount = createAsyncThunk('users/removeUser', async (id, { rejectWithValue }) => {
    try {
        return instanceAuth.delete(`users/delete-user/${id}`);
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
