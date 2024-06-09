import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAuth } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';
import { IWatchList } from '../../../common/types/watchList';

export const getAllWatchListAssets = createAsyncThunk<IWatchList[]>(
  'watchList/getAllWatchListAssets',
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceAuth.get('/watch-list/getAll-assets');
      return res.data;
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
