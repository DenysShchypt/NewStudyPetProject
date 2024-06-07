import { FC } from 'react';
import { Search } from '@mui/icons-material';
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  TextField,
} from '@mui/material';
import { SearchStyles } from './styles';
import { useAppSelector } from '../../utils/hook';
import { IAllAsset } from '../../common/types/assets';

const SearchBar: FC = (): JSX.Element => {
  const allAssetsDescriptions: IAllAsset[] = useAppSelector(
    state => state.assets.allAssets,
  );
  return (
    <Stack spacing={2} sx={{ width: '300px' }}>
      <Autocomplete
        freeSolo
        renderInput={element => (
          <>
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
          </>
        )}
        options={allAssetsDescriptions.map(
          (element: { NAME: string }) => element.NAME,
        )}
      />
    </Stack>
  );
};

export default SearchBar;
