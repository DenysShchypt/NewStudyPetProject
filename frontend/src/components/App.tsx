import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Home from './Home';
import PrivateRoute from '../utils/router/privateRoute';
import AuthRootComponent from './Auth';
import { ColorModeContext, useMode } from '../theme';
import LayoutComponent from './Layout';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutComponent>
        <div className="app">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="login" element={<AuthRootComponent />} />
            <Route path="register" element={<AuthRootComponent />} />
          </Routes>
        </div>
      </ThemeProvider>
      </LayoutComponent>
    </ColorModeContext.Provider>
  );
}

export default App;
