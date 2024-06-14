import { FC, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  AlertColor,
  Avatar,
  Button,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import {
  createWatchListRecord,
  getSearchAssets,
} from '../../store/thunks/assets';
import { IAllAsset, IAssetsWatchList, IData } from '../../common/types/assets';
import { FlexBetween } from '../../components/GeneralComponentsStyles';

const SingleAssetPage: FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const allAssetsDescriptions: IAllAsset[] = useAppSelector(
    state => state.assets.allAssets,
  );
  const searchAssetsDescriptions: IData = useAppSelector(
    state => state.assets.searchAsset,
  );
  const currentSymbol: IAllAsset | undefined = allAssetsDescriptions.find(
    element => element.NAME === (id as string),
  );
  const handleCreateRecord = (): void => {
    try {
      const data: IAssetsWatchList = {
        name: searchAssetsDescriptions?.SYMBOL,
        assetId: searchAssetsDescriptions?.ID,
      };
      dispatch(createWatchListRecord(data));
      setError(false);
      setSeverity('success');
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    } catch (error) {
      setError(true);
      setSeverity('error');
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    }
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
          <Snackbar
            open={open}
            autoHideDuration={6}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
              {!error
                ? 'This is a success!'
                : 'This is a fail, something is wrong!'}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
};

export default SingleAssetPage;
