import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './slice/auth';
import { assetsSliceReducer } from './slice/assets';
import { watchListSliceReducer } from './slice/watchList';
import { newsSliceReducer } from './slice/news';
import { settingsSliceReducer } from './slice/settings';
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        assets: assetsSliceReducer,
        watchList: watchListSliceReducer,
        news: newsSliceReducer,
        settings: settingsSliceReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: [
                'payload.headers',
                'payload.config',
                'payload.request',
                'payload.config.transformRequest',
                'payload.config.transformResponse',
            ],
            ignoredPaths: ['auth.token', 'auth.user'],
        },
    }),
});
export default store;
