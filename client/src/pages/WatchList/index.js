import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getAllWatchListAssets } from '../../store/thunks/watchList';
import { getAllInfoAssets } from '../../store/thunks/assets';
import TopPriceComponent from '../../components/TopPrice';
import { Grid, Typography, useTheme } from '@mui/material';
import { RootGrid } from './styles';
const WatchListPage = () => {
    const theme = useTheme();
    const { watchList } = useAppSelector(state => state.watchList);
    const { allAssets } = useAppSelector(state => state.assets);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllWatchListAssets());
        dispatch(getAllInfoAssets());
    }, [dispatch]);
    const filterFavoriteAssets = allAssets.filter((element) => watchList.some((el) => element.ID === el.assetId));
    return (_jsx(_Fragment, { children: _jsxs(RootGrid, { theme: theme, children: [_jsx(Grid, { className: "watchListHeading", children: _jsx(Typography, { variant: "h2", className: "heading", children: "Favorite" }) }), _jsx(Grid, { className: "assetsTableBlock", children: filterFavoriteAssets && (_jsx(TopPriceComponent, { data: filterFavoriteAssets })) })] }) }));
};
export default WatchListPage;
