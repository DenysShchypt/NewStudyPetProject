import { createSlice } from '@reduxjs/toolkit';
import { getFavoriteAssets } from '../../thunks/assets';
import { IAssetsState } from '../../../common/types/assets';

const initialState: IAssetsState = {
  assets: [],
  favoriteAssets: [],
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFavoriteAssets.fulfilled, (state, action) => {
      state.favoriteAssets = action.payload;
    });
  },
});

export const assetsSliceReducer = assetsSlice.reducer;
