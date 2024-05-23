import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import LoginPage from './Auth/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
