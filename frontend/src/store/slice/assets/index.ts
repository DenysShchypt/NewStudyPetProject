import { createSlice } from '@reduxjs/toolkit';
import { getFavoriteAssets, getPricePeriod } from '../../thunks/assets';
import { IAssetsState } from '../../../common/types/assets';

const initialState: IAssetsState = {
  assets: [],
  favoriteAssets: [],
  historyPrice: [],
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
      });
  },
});

export const assetsSliceReducer = assetsSlice.reducer;
