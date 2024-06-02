export interface IAsset {
  asset_id: string;
  name: string;
  price_usd: number;
}

export interface IAssetsState {
  assets: IAsset[];
  favoriteAssets: IAsset[];
}
