import { configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './slice/auth';
import { assetsSliceReducer } from './slice/assets';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    assets: assetsSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
