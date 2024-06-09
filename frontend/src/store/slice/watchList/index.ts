import { createSlice } from '@reduxjs/toolkit';
import { IWatchListState } from '../../../common/types/watchList';
import { getAllWatchListAssets } from '../../thunks/watchList';

const initialState: IWatchListState = {
  watchList: [],
};

export const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllWatchListAssets.fulfilled, (state, action) => {
      state.watchList = action.payload;
    });
  },
});

export const watchListSliceReducer = watchListSlice.reducer;
