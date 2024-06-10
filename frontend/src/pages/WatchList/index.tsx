import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getAllWatchListAssets } from '../../store/thunks/watchList';
import { getAllInfoAssets } from '../../store/thunks/assets';
import { IAllAsset } from '../../common/types/assets';
import { IWatchList } from '../../common/types/watchList';
import TopPriceComponent from '../../components/TopPrice';
import { Grid, Typography, useTheme } from '@mui/material';
import { RootGrid } from './styles';

const WatchListPage: FC = (): JSX.Element => {
  const theme = useTheme();
  const { watchList } = useAppSelector(state => state.watchList);
  const { allAssets } = useAppSelector(state => state.assets);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllWatchListAssets());
    dispatch(getAllInfoAssets());
  }, [dispatch]);

  const filterFavoriteAssets: IAllAsset[] = allAssets.filter(
    (element: IAllAsset) =>
      watchList.some((el: IWatchList) => element.ID === el.assetId),
  );
  // console.log(watchList);
  // console.log(allAssets);
  return (
    <>
      <RootGrid theme={theme}>
        <Grid className="watchListHeading">
          <Typography variant="h2" className="heading">
            Favorite
          </Typography>
        </Grid>
        <Grid className="assetsTableBlock">
          {filterFavoriteAssets && (
            <TopPriceComponent data={filterFavoriteAssets} />
          )}
        </Grid>
      </RootGrid>
    </>
  );
};

export default WatchListPage;
