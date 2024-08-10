import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAuth } from '../../../utils/axios';
export const getAllWatchListAssets = createAsyncThunk('watchList/getAllWatchListAssets', async (_, { rejectWithValue }) => {
    try {
        const res = await instanceAuth.get('/watch-list/getAll-assets');
        return res.data;
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
