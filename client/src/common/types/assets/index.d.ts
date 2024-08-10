export interface IAsset {
    Data: IData;
}
export interface IData {
    ID: number;
    LOGO_URL: string;
    NAME: string;
    ASSET_DESCRIPTION: string;
    PRICE_USD: number;
    SEO_TITLE: string;
    TOTAL_MKT_CAP_USD: number;
    SEO_DESCRIPTION: string;
    PRICE_USD_LAST_UPDATE_TS: number;
    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD: number;
    SYMBOL: string;
}
export interface IAllAsset {
    ID: number;
    LOGO_URL: string;
    NAME: string;
    ASSET_DESCRIPTION_SNIPPET: string;
    PRICE_USD: number;
    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD: number;
    SPOT_MOVING_24_HOUR_CHANGE_USD: number;
    SYMBOL: string;
}
export interface IAssetPriceData {
    close: number;
    high: number;
    low: number;
    open: number;
    time: number;
}
export interface IAssetPrice {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: IAssetPriceData[];
}
export interface IAssetsState {
    favoriteAssets: IAssetFavoriteResponses[];
    historyPrice: IAssetPriceResponses[];
    allAssets: IAllAsset[];
    searchAsset: IData;
}
export interface IAssetFavoriteResponses {
    name: string;
    data: IAsset;
}
export interface IAssetPriceResponses {
    name: string;
    data: IAssetPrice;
}
export interface IAssetsWatchList {
    name: string;
    assetId: number;
}
