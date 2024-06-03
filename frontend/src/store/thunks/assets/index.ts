import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataCoinMarket } from '../../../utils/axios';
import { IError } from '../../../common/types/errors';
import { IAsset } from '../../../common/types/assets';

export const getFavoriteAssets = createAsyncThunk<IAsset[], string>(
  'assets/getFavoriteAssets',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await getDataCoinMarket.get('/v1/assets', {
        params: {
          filter_asset_id: data,
          // include_supply: true,
          // filter_asset_id: data,
        },
      });
      return response.data;
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
