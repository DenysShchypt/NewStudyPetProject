import { createSlice } from '@reduxjs/toolkit';
import {
  getAllInfoAssets,
  getFavoriteAssets,
  getPricePeriod,
} from '../../thunks/assets';
import { IAssetsState } from '../../../common/types/assets';

const initialState: IAssetsState = {
  assets: [],
  favoriteAssets: [],
  historyPrice: [],
  allAssets: [],
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
      });
  },
});

export const assetsSliceReducer = assetsSlice.reducer;
