import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './slice/auth';
import { assetsSliceReducer } from './slice/assets';
import { watchListSliceReducer } from './slice/watchList';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    assets: assetsSliceReducer,
    watchList: watchListSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
