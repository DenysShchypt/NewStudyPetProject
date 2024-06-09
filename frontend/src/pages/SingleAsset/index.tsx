import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import {
  createWatchListRecord,
  getSearchAssets,
} from '../../store/thunks/assets';
import { IAllAsset, IData } from '../../common/types/assets';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { FlexBetween } from '../../components/GeneralComponentsStyles';

const SingleAssetPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const allAssetsDescriptions: IAllAsset[] = useAppSelector(
    state => state.assets.allAssets,
  );
  const searchAssetsDescriptions: IData = useAppSelector(
    state => state.assets.searchAsset,
  );
  const currentSymbol = allAssetsDescriptions.find(
    element => element.NAME === (id as string),
  );
  const handleCreateRecord = () => {
    const data = {
      name: searchAssetsDescriptions?.NAME,
      assetId: searchAssetsDescriptions?.ID,
    };
    dispatch(createWatchListRecord(data));
  };
  useEffect(() => {
    dispatch(getSearchAssets(`${currentSymbol?.SYMBOL}`));
  }, []);

  return (
    <>
      {searchAssetsDescriptions && (
        <Grid
          container
          spacing={2}
          sx={{
            margin: 5,
            alignItems: 'center',
          }}
        >
          <Grid
            item
            sm={6}
            xs={12}
            display="flex"
            alignItems={'center'}
            justifyContent="end"
          >
            <FlexBetween>
              <Avatar
                src={searchAssetsDescriptions.LOGO_URL}
                sx={{
                  marginRight: 1,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {searchAssetsDescriptions.NAME}
              </Typography>
            </FlexBetween>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography
              variant="h2"
              sx={{
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              Price: {searchAssetsDescriptions.PRICE_USD.toFixed(2)} $
            </Typography>
          </Grid>
          <Grid container>
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              color="success"
            >
              Go back
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleCreateRecord()}
            >
              Favorite
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SingleAssetPage;
