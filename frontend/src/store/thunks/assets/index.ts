import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  instanceAssets,
  instanceAuth,
  instanceHistory,
} from '../../../utils/axios';
import { IError } from '../../../common/types/errors';
import {
  IAllAsset,
  IAssetFavoriteResponses,
  IAssetPriceResponses,
  IAssetsWatchList,
  IData,
} from '../../../common/types/assets';

export const getFavoriteAssets = createAsyncThunk<
  IAssetFavoriteResponses,
  string,
  { rejectValue: string }
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

export const getSearchAssets = createAsyncThunk<
  IData,
  string,
  { rejectValue: string }
>('assets/getSearchAssets', async (data: string, { rejectWithValue }) => {
  try {
    const response = await instanceAssets.get('/asset/v1/data/by/symbol', {
      params: {
        asset_symbol: data,
      },
    });

    return response.data.Data;
  } catch (error) {
    const typedError = error as IError;
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});

export const getPricePeriod = createAsyncThunk<
  IAssetPriceResponses,
  string,
  { rejectValue: string }
>('assets/getPricePeriod', async (data: string, { rejectWithValue }) => {
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
});
export const getAllInfoAssets = createAsyncThunk<
  IAllAsset[],
  void,
  { rejectValue: string }
>('assets/getAllInfoAssets', async (_, { rejectWithValue }) => {
  try {
    const response = await instanceAssets.get(`/asset/v1/top/list`, {
      params: {
        page: 1,
        page_size: 20,
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
});
export const createWatchListRecord = createAsyncThunk<
  IAssetsWatchList,
  IAssetsWatchList,
  { rejectValue: string }
>(
  'assets/createWatchListRecord',
  async (data: IAssetsWatchList, { rejectWithValue }) => {
    try {
      const response = await instanceAuth.post(
        `/watch-list/create-asset`,
        data,
      );
      return { name: response.data.name, assetId: response.data.assetId };
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
