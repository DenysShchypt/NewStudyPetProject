import { createSlice } from '@reduxjs/toolkit';
import { getNews } from '../../thunks/news';
const initialState = {
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
