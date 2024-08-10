export interface IWatchListState {
    watchList: IWatchList[];
}
export interface IWatchList {
    id: number;
    user: number;
    name: string;
    assetId: number;
    createdAt: string;
    updatedAt: string;
}
