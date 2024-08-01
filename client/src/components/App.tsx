import { Route, Routes} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import PrivateRoute from '../utils/router/privateRoute';
import { ColorModeContext, useMode } from '../theme';
import LayoutComponent from './Layout';
import HomePage from '../pages/Home';
import WatchListPage from '../pages/WatchList';
import NewsPage from '../pages/News';
import SettingsPage from '../pages/Settings';
import AuthRootComponent from '../pages/Auth';
import SingleAssetPage from '../pages/SingleAsset';

function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Routes>
            <Route element={<LayoutComponent />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/watchList" element={<WatchListPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/single/:id" element={<SingleAssetPage />} />
              </Route>
              <Route path="login" element={<AuthRootComponent />} />
              <Route path="register" element={<AuthRootComponent />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
