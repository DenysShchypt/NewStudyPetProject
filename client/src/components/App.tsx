import { Route, Routes, Navigate } from 'react-router-dom';
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
  const isAuthenticated = (): boolean => {
    const token = document.cookie.split('; ').find(row => row.startsWith('fresh='))?.split('=')[1];
    return !!token;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Routes>
            <Route element={<LayoutComponent />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/watchList" element={<WatchListPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/single/:id" element={<SingleAssetPage />} />
              </Route>
              <Route path="login" element={isAuthenticated() ?<AuthRootComponent />: <Navigate to="/" />} />
              <Route path="register" element={isAuthenticated() ?<AuthRootComponent />: <Navigate to="/" />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
