import { IWatchList } from '../../../common/types/watchList';
export declare const getAllWatchListAssets: import("@reduxjs/toolkit").AsyncThunk<IWatchList[], void, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
