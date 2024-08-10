import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAssets, instanceAuth, instanceHistory, } from '../../../utils/axios';
export const getFavoriteAssets = createAsyncThunk('assets/getFavoriteAssets', async (data, { rejectWithValue }) => {
    try {
        const response = await instanceAssets.get('/asset/v1/data/by/symbol', {
            params: {
                asset_symbol: data,
            },
        });
        return { name: data, data: response.data };
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const getSearchAssets = createAsyncThunk('assets/getSearchAssets', async (data, { rejectWithValue }) => {
    try {
        const response = await instanceAssets.get('/asset/v1/data/by/symbol', {
            params: {
                asset_symbol: data,
            },
        });
        return response.data.Data;
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const getPricePeriod = createAsyncThunk('assets/getPricePeriod', async (data, { rejectWithValue }) => {
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
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const getAllInfoAssets = createAsyncThunk('assets/getAllInfoAssets', async (_, { rejectWithValue }) => {
    try {
        const response = await instanceAssets.get(`/asset/v1/top/list`, {
            params: {
                page: 1,
                page_size: 20,
            },
        });
        return response.data.Data.LIST;
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
export const createWatchListRecord = createAsyncThunk('assets/createWatchListRecord', async (data, { rejectWithValue }) => {
    try {
        const response = await instanceAuth.post(`/watch-list/create-asset`, data);
        return { name: response.data.name, assetId: response.data.assetId };
    }
    catch (error) {
        const typedError = error;
        if (typedError.response && typedError.response.data?.message) {
            return rejectWithValue(typedError.response.data.message);
        }
        else {
            return rejectWithValue(typedError.message);
        }
    }
});
