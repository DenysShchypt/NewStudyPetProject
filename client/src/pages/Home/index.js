import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { TrendingUpOutlined, TrendingDownOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getAllInfoAssets, getFavoriteAssets, getPricePeriod, } from '../../store/thunks/assets';
import { BoxStyled } from './styles';
import AreaChart from '../../components/charts/AreaChart';
import LineChart from '../../components/charts/LineChart';
import TopPriceComponent from '../../components/TopPrice';
const HomePage = () => {
    const useFavoriteRef = useRef(false);
    const theme = useTheme();
    const favoriteAssets = useAppSelector(state => state.assets.favoriteAssets);
    const historyPrice = useAppSelector(state => state.assets.historyPrice);
    const allAssetsDescriptions = useAppSelector(state => state.assets.allAssets)
        .slice()
        .sort((a, b) => b.PRICE_USD - a.PRICE_USD);
    const dispatch = useAppDispatch();
    const favoriteAssetsName = useMemo(() => ['BTC', 'ETH'], []);
    const fetchDataAsset = useCallback((data) => {
        data.forEach((element) => {
            dispatch(getFavoriteAssets(element));
            dispatch(getPricePeriod(element));
        });
    }, [dispatch]);
    useEffect(() => {
        if (useFavoriteRef.current)
            return;
        useFavoriteRef.current = true;
        fetchDataAsset(favoriteAssetsName);
        dispatch(getAllInfoAssets());
    }, [fetchDataAsset, favoriteAssetsName, dispatch]);
    const filterFavoriteArray = favoriteAssets.filter((value, index, self) => index === self.findIndex(t => t.name === value.name));
    const filterHistoryPrice = historyPrice.filter((value, index, self) => index === self.findIndex(t => t.name === value.name));
    const renderFavoriteBlok = filterFavoriteArray.map((element) => {
        const { ID, NAME, PRICE_USD, SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD } = element.data.Data;
        const history = filterHistoryPrice.filter(elem => elem.name === element.name);
        return (_jsx(Grid, { item: true, xs: 12, sm: 6, lg: 6, children: _jsxs(Grid, { container: true, className: "topCardItem", children: [_jsxs(Grid, { item: true, xs: 12, sm: 6, lg: 6, children: [_jsx("h3", { className: "assetName", children: NAME }), _jsxs("div", { className: "itemDetails", children: [_jsxs("h3", { className: "cardPrice", children: ["$", PRICE_USD.toFixed(2)] }), _jsxs(Box, { className: SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0
                                            ? 'priceTrend trendUp'
                                            : 'priceTrend trendDown', children: [SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0 ? (_jsx(TrendingUpOutlined, { fontSize: "small" })) : (_jsx(TrendingDownOutlined, { fontSize: "small" })), _jsxs("span", { children: [SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD.toFixed(2), " %"] })] })] })] }), _jsx(Grid, { item: true, xs: 12, sm: 6, lg: 6, children: history[0] && _jsx(AreaChart, { data: history[0].data.Data }) })] }) }, ID));
    });
    return (_jsxs(BoxStyled, { theme: theme, children: [_jsx(Grid, { container: true, spacing: 2, className: "areaChart", children: renderFavoriteBlok }), _jsx(Grid, { container: true, className: "lineChartBlok", children: _jsx(Grid, { item: true, xs: 12, sm: 12, lg: 12, children: filterHistoryPrice[0] && _jsx(LineChart, { data: filterHistoryPrice[0] }) }) }), _jsx(Grid, { container: true, className: "topPriceRoot", children: _jsx(Grid, { item: true, xs: 12, sm: 12, lg: 12, children: allAssetsDescriptions.length !== 0 && (_jsx(TopPriceComponent, { data: allAssetsDescriptions })) }) })] }));
};
export default HomePage;
