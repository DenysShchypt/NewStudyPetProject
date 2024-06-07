import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAssets, instanceHistory } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';
import {
  IAllAsset,
  IAssetFavoriteResponses,
  IAssetPriceResponses,
} from '../../../common/types/assets';

export const getFavoriteAssets = createAsyncThunk<
  IAssetFavoriteResponses,
  string
>('assets/getFavoriteAssets', async (data: string, { rejectWithValue }) => {
  try {
    const response = await instanceAssets.get('/asset/v1/data/by/symbol', {
      params: {
        asset_symbol: data,
      },
    });
    return { name: data, data: response.data };
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});

export const getPricePeriod = createAsyncThunk<IAssetPriceResponses, string>(
  'assets/getPricePeriod',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await instanceHistory.get(`data/v2/histoday`, {
        params: {
          fsym: data,
          tsym: 'USD',
          limit: 30,
          aggregate: 1,
        },
      });

      return { name: data, data: response.data.Data };
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
export const getAllInfoAssets = createAsyncThunk<IAllAsset[]>(
  'assets/getAllInfoAssets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instanceAssets.get(`/asset/v1/top/list`, {
        params: {
          page: 1,
          page_size: 10,
        },
      });
      return response.data.Data.LIST;
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
