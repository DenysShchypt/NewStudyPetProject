import { jsx as _jsx } from "react/jsx-runtime";
import { Search } from '@mui/icons-material';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import { useAppSelector } from '../../utils/hook';
import { useNavigate } from 'react-router-dom';
const SearchBarComponent = () => {
    const navigate = useNavigate();
    const allAssetsDescriptions = useAppSelector(state => state.assets.allAssets);
    return (_jsx(Stack, { spacing: 2, sx: { width: '300px' }, children: _jsx(Autocomplete, { freeSolo: true, onChange: (_, value) => navigate(`single/${value}`), renderInput: element => (_jsx(TextField, { ...element, label: "Search", InputProps: {
                    ...element.InputProps,
                    type: 'search',
                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(Search, {}) })),
                } })), options: allAssetsDescriptions.map((element) => element.NAME) }) }));
};
export default SearchBarComponent;
