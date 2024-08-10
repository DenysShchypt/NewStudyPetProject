import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getNews } from '../../store/thunks/news';
import { Box, Grid, Link, Typography, useTheme } from '@mui/material';
import { RootStylesNews } from './styles';
const NewsPage = () => {
    const [partNews, setPartNews] = useState([]);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const allNews = useAppSelector(state => state.news.listNews);
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            setPartNews(prevNews => allNews.slice(0, prevNews.length + 10));
        }
    };
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);
    useEffect(() => {
        setPartNews(allNews.slice(0, 10));
    }, [allNews]);
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const renderNews = partNews.map(news => (_jsxs(Grid, { container: true, className: "newsItem", children: [_jsx(Grid, { item: true, xs: 12, md: 3, children: _jsx("img", { src: news.imageurl, alt: news.title }) }), _jsxs(Grid, { item: true, xs: 12, md: 9, children: [_jsx(Box, { className: "newsTitle", children: _jsxs(Typography, { variant: "h3", children: [" ", news.title] }) }), _jsx(Box, { children: _jsxs(Typography, { variant: "body1", children: [" ", news.body] }) })] }), _jsx(Grid, { item: true, xs: 12, md: 12, className: "readMore", children: _jsx(Typography, { variant: "h4", children: _jsx(Link, { href: news.url, children: "Read more" }) }) })] }, news.id)));
    return (_jsxs(RootStylesNews, { theme: theme, children: [_jsx(Grid, { className: "blockTitle", children: _jsx(Typography, { variant: "h2", children: "News" }) }), _jsxs(Grid, { children: [" ", renderNews] })] }));
};
export default NewsPage;
