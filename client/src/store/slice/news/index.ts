import { createSlice } from '@reduxjs/toolkit';
import { IListNews } from '../../../common/types/news';
import { getNews } from '../../thunks/news';

const initialState: IListNews = {
  listNews: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.listNews = action.payload;
    });
  },
});

export const newsSliceReducer = newsSlice.reducer;
