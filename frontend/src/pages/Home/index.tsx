import { Grid, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getFavoriteAssets, getPricePeriod } from '../../store/thunks/assets';
import {
  IAssetFavoriteResponses,
  IAssetPriceResponses,
} from '../../common/types/assets';
import { BoxStyled } from './styles';
import AreaChart from '../../components/charts/areaChart';

const Home: FC = (): JSX.Element => {
  const useFavoriteRef = useRef(false);
  const theme = useTheme();
  const favoriteAssets: IAssetFavoriteResponses[] = useAppSelector(
    state => state.assets.favoriteAssets,
  );
  const historyPrice: IAssetPriceResponses[] = useAppSelector(
    state => state.assets.historyPrice,
  );
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
  }, [dispatch, favoriteAssetsName]);

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
      const { ID, NAME, PRICE_USD, CIRCULATING_MKT_CAP_USD } =
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
                <h3 className="cardPrice">${PRICE_USD.toFixed(4)}</h3>
                <p className="cardCapitalize">
                  ${CIRCULATING_MKT_CAP_USD.toFixed(0)}
                </p>
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
      <Grid container spacing={2}>
        {renderFavoriteBlok}
      </Grid>
    </BoxStyled>
  );
};

export default Home;
