import { createSlice } from '@reduxjs/toolkit';
import { infoUser } from '../../thunks/settings';
const initialState = {
    user: {
        wallet: 0,
        email: '',
        firstName: '',
        lastName: '',
        id: '',
        roles: [],
    },
};
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(infoUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});
export const settingsSliceReducer = settingsSlice.reducer;
