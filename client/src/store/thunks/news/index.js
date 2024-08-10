import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceHistory } from '../../../utils/axios';
export const getNews = createAsyncThunk('news/getNews', async (_, { rejectWithValue }) => {
    try {
        const res = await instanceHistory.get('/data/v2/news/?lang=EN');
        return res.data.Data;
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
