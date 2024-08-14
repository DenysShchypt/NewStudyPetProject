import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import PrivateRoute from '../utils/router/privateRoute';
import { ColorModeContext, useMode } from '../theme';
import LayoutComponent from './Layout';
import HomePage from '../pages/Home';
import WatchListPage from '../pages/WatchList';
import NewsPage from '../pages/News';
import SettingsPage from '../pages/Settings';
import AuthRootComponent from '../pages/Auth';
import SingleAssetPage from '../pages/SingleAsset';
import { useAppDispatch, useAppSelector } from '../utils/hook';
import { logoutUsers } from '../store/thunks/auth';

function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useAppDispatch();
  const activeUser: string = useAppSelector(
    state => state.auth.user.verifyLink,
  );
  const timeCheckVerify:number = 15*60*1000
  useEffect(() => {
    const handleLogout = () => {
      dispatch(logoutUsers());
    };
    const timer = setTimeout(()=>{
      if (activeUser!=="active") {
        handleLogout()
      }
    }
  , timeCheckVerify);

    return () => clearTimeout(timer); 
  }, [dispatch, activeUser]);
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
