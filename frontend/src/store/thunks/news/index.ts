import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceHistory } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';
import { INews } from '../../../common/types/news';

export const getNews = createAsyncThunk<INews[], void, { rejectValue: string }>(
  'news/getNews',
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceHistory.get('/data/v2/news/?lang=EN');
      return res.data.Data;
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
