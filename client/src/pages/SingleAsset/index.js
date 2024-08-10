import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Avatar, Button, Grid, Snackbar, Typography, } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { createWatchListRecord, getSearchAssets, } from '../../store/thunks/assets';
import { FlexBetween } from '../../components/GeneralComponentsStyles';
const SingleAssetPage = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const allAssetsDescriptions = useAppSelector(state => state.assets.allAssets);
    const searchAssetsDescriptions = useAppSelector(state => state.assets.searchAsset);
    const currentSymbol = allAssetsDescriptions.find(element => element.NAME === id);
    const handleCreateRecord = () => {
        try {
            const data = {
                name: searchAssetsDescriptions?.SYMBOL,
                assetId: searchAssetsDescriptions?.ID,
            };
            dispatch(createWatchListRecord(data));
            setError(false);
            setSeverity('success');
            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
        }
        catch (error) {
            setError(true);
            setSeverity('error');
            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
        }
    };
    useEffect(() => {
        dispatch(getSearchAssets(`${currentSymbol?.SYMBOL}`));
    }, []);
    return (_jsx(_Fragment, { children: searchAssetsDescriptions && (_jsxs(Grid, { container: true, spacing: 2, sx: {
                margin: 5,
                alignItems: 'center',
            }, children: [_jsx(Grid, { item: true, sm: 6, xs: 12, display: "flex", alignItems: 'center', justifyContent: "end", children: _jsxs(FlexBetween, { children: [_jsx(Avatar, { src: searchAssetsDescriptions.LOGO_URL, sx: {
                                    marginRight: 1,
                                } }), _jsx(Typography, { variant: "h2", sx: {
                                    fontSize: 20,
                                    fontWeight: 600,
                                }, children: searchAssetsDescriptions.NAME })] }) }), _jsx(Grid, { item: true, sm: 6, xs: 12, children: _jsxs(Typography, { variant: "h2", sx: {
                            fontSize: 20,
                            fontWeight: 600,
                        }, children: ["Price: ", searchAssetsDescriptions.PRICE_USD.toFixed(2), " $"] }) }), _jsxs(Grid, { container: true, children: [_jsx(Button, { onClick: () => navigate(-1), variant: "outlined", color: "success", children: "Go back" }), _jsx(Button, { variant: "outlined", color: "success", onClick: () => handleCreateRecord(), children: "Favorite" })] }), _jsx(Snackbar, { open: open, autoHideDuration: 6, anchorOrigin: { vertical: 'top', horizontal: 'right' }, children: _jsx(Alert, { severity: severity, variant: "filled", sx: { width: '100%' }, children: !error
                            ? 'This is a success!'
                            : 'This is a fail, something is wrong!' }) })] })) }));
};
export default SingleAssetPage;
