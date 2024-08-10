declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("../common/types/auth").IAuthState;
    assets: import("../common/types/assets").IAssetsState;
    watchList: import("../common/types/watchList").IWatchListState;
    news: import("../common/types/news").IListNews;
    settings: import("../common/types/tabs").IInfoUserState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("../common/types/auth").IAuthState;
        assets: import("../common/types/assets").IAssetsState;
        watchList: import("../common/types/watchList").IWatchListState;
        news: import("../common/types/news").IListNews;
        settings: import("../common/types/tabs").IInfoUserState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
