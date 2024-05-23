import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from '../utils/router/privateRoute';
import AuthRootComponent from './Auth';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="login" element={<AuthRootComponent />} />
        <Route path="register" element={<AuthRootComponent />} />
      </Routes>
    </div>
  );
}

export default App;
