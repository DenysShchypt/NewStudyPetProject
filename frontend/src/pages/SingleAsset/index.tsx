import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [severity, setSeverity] = useState<AlertColor>('success');
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
    try {
      const data: IAssetsWatchList = {
        name: searchAssetsDescriptions?.SYMBOL,
        assetId: searchAssetsDescriptions?.ID,
      };
      dispatch(createWatchListRecord(data));
      setSeverity('success');
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    } catch (error) {
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
          <Snackbar open={open} autoHideDuration={6}>
            <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
              This is a success Alert inside a Snackbar!
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
};

export default SingleAssetPage;
