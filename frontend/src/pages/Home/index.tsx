import { Box, Grid, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { TrendingUpOutlined, TrendingDownOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import {
  getAllInfoAssets,
  getFavoriteAssets,
  getPricePeriod,
} from '../../store/thunks/assets';
import {
  IAllAsset,
  IAssetFavoriteResponses,
  IAssetPriceResponses,
} from '../../common/types/assets';
import { BoxStyled } from './styles';
import AreaChart from '../../components/charts/AreaChart';
import LineChart from '../../components/charts/LineChart';
import TopPriceComponent from '../../components/TopPrice';

const HomePage: FC = (): JSX.Element => {
  const useFavoriteRef = useRef(false);
  const theme = useTheme();
  const favoriteAssets: IAssetFavoriteResponses[] = useAppSelector(
    state => state.assets.favoriteAssets,
  );
  const historyPrice: IAssetPriceResponses[] = useAppSelector(
    state => state.assets.historyPrice,
  );

  const allAssetsDescriptions: IAllAsset[] = useAppSelector(
    state => state.assets.allAssets,
  )
    .slice()
    .sort((a, b) => b.PRICE_USD - a.PRICE_USD);

  const dispatch = useAppDispatch();
  const favoriteAssetsName = useMemo(() => ['BTC', 'ETH'], []);
  const fetchDataAsset = useCallback(
    (data: string[]) => {
      data.forEach((element: string) => {
        dispatch(getFavoriteAssets(element));
        dispatch(getPricePeriod(element));
      });
    },
    [dispatch],
  );

  useEffect(() => {
    if (useFavoriteRef.current) return;
    useFavoriteRef.current = true;
    fetchDataAsset(favoriteAssetsName);
    dispatch(getAllInfoAssets());
  }, [fetchDataAsset, favoriteAssetsName, dispatch]);

  const filterFavoriteArray: IAssetFavoriteResponses[] = favoriteAssets.filter(
    (value, index, self) =>
      index === self.findIndex(t => t.name === value.name),
  );
  const filterHistoryPrice: IAssetPriceResponses[] = historyPrice.filter(
    (value, index, self) =>
      index === self.findIndex(t => t.name === value.name),
  );
  const renderFavoriteBlok = filterFavoriteArray.map(
    (element: IAssetFavoriteResponses) => {
      const { ID, NAME, PRICE_USD, SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD } =
        element.data.Data;
      const history: IAssetPriceResponses[] = filterHistoryPrice.filter(
        elem => elem.name === element.name,
      );

      return (
        <Grid key={ID} item xs={12} sm={6} lg={6}>
          <Grid container className="topCardItem">
            <Grid item xs={12} sm={6} lg={6}>
              <h3 className="assetName">{NAME}</h3>
              <div className="itemDetails">
                <h3 className="cardPrice">${PRICE_USD.toFixed(2)}</h3>
                <Box
                  className={
                    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0
                      ? 'priceTrend trendUp'
                      : 'priceTrend trendDown'
                  }
                >
                  {SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0 ? (
                    <TrendingUpOutlined fontSize="small" />
                  ) : (
                    <TrendingDownOutlined fontSize="small" />
                  )}
                  <span>
                    {SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD.toFixed(2)} %
                  </span>
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              {history.length !== 0 && (
                <AreaChart data={history[0].data.Data} />
              )}
            </Grid>
          </Grid>
        </Grid>
      );
    },
  );
  return (
    <BoxStyled theme={theme}>
      <Grid container spacing={2} className="areaChart">
        {renderFavoriteBlok}
      </Grid>
      <Grid container className="lineChartBlok">
        <Grid item xs={12} sm={12} lg={12}>
          {filterHistoryPrice.length !== 0 &&
            filterHistoryPrice[0].name === 'BTC' && (
              <LineChart data={filterHistoryPrice[0]} />
            )}
        </Grid>
      </Grid>
      <Grid container className="topPriceRoot">
        <Grid item xs={12} sm={12} lg={12}>
          {allAssetsDescriptions.length !== 0 && (
            <TopPriceComponent data={allAssetsDescriptions} />
          )}
        </Grid>
      </Grid>
    </BoxStyled>
  );
};

export default HomePage;
