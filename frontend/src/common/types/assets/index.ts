export interface IAsset {
  Data: {
    ID: number;
    LOGO_URL: string;
    NAME: string;
    ASSET_DESCRIPTION: string;
    PRICE_USD: number;
    SEO_TITLE: string;
    TOTAL_MKT_CAP_USD: number;
    CIRCULATING_MKT_CAP_USD: number;
    SEO_DESCRIPTION: string;
    PRICE_USD_LAST_UPDATE_TS: number;
  };
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
  assets: IAssetFavoriteResponses[];
  favoriteAssets: IAssetFavoriteResponses[];
  historyPrice: IAssetPriceResponses[];
}

export interface IAssetFavoriteResponses {
  name: string;
  data: IAsset;
}

export interface IAssetPriceResponses {
  name: string;
  data: IAssetPrice;
}
