import { FC } from 'react';
import { Search } from '@mui/icons-material';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import { useAppSelector } from '../../utils/hook';
import { IAllAsset } from '../../common/types/assets';
import { useNavigate } from 'react-router-dom';

const SearchBarComponent: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const allAssetsDescriptions: IAllAsset[] = useAppSelector(
    state => state.assets.allAssets,
  );
  return (
    <Stack spacing={2} sx={{ width: '300px' }}>
      <Autocomplete
        freeSolo
        onChange={(e: any, value: string | null) => navigate(`single/${value}`)}
        renderInput={element => (
          <TextField
            {...element}
            label="Search"
            InputProps={{
              ...element.InputProps,
              type: 'search',
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
        options={allAssetsDescriptions.map(
          (element: { NAME: string }) => element.NAME,
        )}
      />
    </Stack>
  );
};

export default SearchBarComponent;
