import { createSlice } from '@reduxjs/toolkit';
import {
  createWatchListRecord,
  getAllInfoAssets,
  getFavoriteAssets,
  getPricePeriod,
  getSearchAssets,
} from '../../thunks/assets';
import { IAssetsState, IAssetsWatchList } from '../../../common/types/assets';

const initialState: IAssetsState = {
  favoriteAssets: [],
  historyPrice: [],
  allAssets: [],
  searchAsset: {
    ID: 0,
    LOGO_URL: '',
    NAME: '',
    ASSET_DESCRIPTION: '',
    PRICE_USD: 0,
    SEO_TITLE: '',
    TOTAL_MKT_CAP_USD: 0,
    SEO_DESCRIPTION: '',
    PRICE_USD_LAST_UPDATE_TS: 0,
    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD: 0,
    SYMBOL: '',
  },
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFavoriteAssets.fulfilled, (state, action) => {
        state.favoriteAssets.push(action.payload);
      })
      .addCase(getPricePeriod.fulfilled, (state, action) => {
        state.historyPrice.push(action.payload);
      })
      .addCase(getAllInfoAssets.fulfilled, (state, action) => {
        state.allAssets = action.payload;
      })
      .addCase(getSearchAssets.fulfilled, (state, action) => {
        state.searchAsset = action.payload;
      });
  },
});

export const assetsSliceReducer = assetsSlice.reducer;
