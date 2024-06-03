export interface IAsset {
  asset_id: string;
  name: string;
  price_usd: number;
  volume_1hrs_usd: number;
}

export interface IAssetsState {
  assets: IAsset[];
  favoriteAssets: IAsset[];
}
