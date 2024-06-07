import { FC, useEffect, useRef } from 'react';
import { Search } from '@mui/icons-material';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import { useAppSelector } from '../../utils/hook';
import { IAllAsset } from '../../common/types/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBarComponent: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const allAssetsDescriptions: IAllAsset[] = useAppSelector(
    state => state.assets.allAssets,
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [location]);
  return (
    <Stack spacing={2} sx={{ width: '300px' }}>
      <Autocomplete
        freeSolo
        onChange={(e: any, value: string | null) => navigate(`single/${value}`)}
        renderInput={element => (
          <>
            <TextField
              {...element}
              inputRef={inputRef}
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

export default SearchBarComponent;
