import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from '../utils/router/privateRoute';
import AuthRootComponent from './Auth';
import { ColorModeContext, useMode } from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
    </ColorModeContext.Provider>
  );
}

export default App;
