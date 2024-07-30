import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { getNews } from '../../store/thunks/news';
import { Box, Grid, Link, Typography, useTheme } from '@mui/material';
import { RootStylesNews } from './styles';
import { INews } from '../../common/types/news';

const NewsPage: FC = (): JSX.Element => {
  const [partNews, setPartNews] = useState<INews[]>([]);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const allNews: INews[] = useAppSelector(state => state.news.listNews);
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

  const renderNews: JSX.Element[] = partNews.map(news => (
    <Grid container key={news.id} className="newsItem">
      <Grid item xs={12} md={3}>
        <img src={news.imageurl} alt={news.title} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box className="newsTitle">
          <Typography variant="h3"> {news.title}</Typography>
        </Box>
        <Box>
          <Typography variant="body1"> {news.body}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} className="readMore">
        <Typography variant="h4">
          <Link href={news.url}>Read more</Link>
        </Typography>
      </Grid>
    </Grid>
  ));

  return (
    <RootStylesNews theme={theme}>
      <Grid className="blockTitle">
        <Typography variant="h2">News</Typography>
      </Grid>
      <Grid> {renderNews}</Grid>
    </RootStylesNews>
  );
};

export default NewsPage;
