import { Box, Grid, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getFavoriteAssets } from '../../store/thunks/assets';
import { IAsset } from '../../common/types/assets';
import { BoxStyled } from './styles';

const Home: React.FC = (): JSX.Element => {
  const { favoriteAssets } = useAppSelector(state => state.assets);
  console.log(favoriteAssets);
  const dispatch = useAppDispatch();
  const favoriteAssetsName = 'BTC;ETH';
  const useFavoriteRef = useRef(false);
  const theme = useTheme();

  useEffect(() => {
    if (useFavoriteRef.current) return;
    useFavoriteRef.current = true;
    dispatch(getFavoriteAssets(favoriteAssetsName));
  }, []);

  const renderFavoriteBlok = favoriteAssets.map((element: IAsset) => {
    return (
      <Grid key={element.asset_id} item xs={12} sm={6} lg={6}>
        <Grid container className="topCardItem">
          <Grid item xs={12} sm={6} lg={6}>
            {element.name}
            {element.price_usd.toFixed(4)}
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            {element.name}
          </Grid>
        </Grid>
      </Grid>
    );
  });
  return (
    <BoxStyled theme={theme}>
      <Grid container spacing={2}>
        {renderFavoriteBlok}
      </Grid>
    </BoxStyled>
  );
};

export default Home;
